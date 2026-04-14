import { useState } from "react";
import { CreditCard } from "lucide-react";
import ActionButton from "../UI/ActionButton";
import PaymentForm from "../Payment/PaymentForm";

// ------------------ FORMATTERS ------------------

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(amount);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// ------------------ CALCULATIONS ------------------

const calculateOneOffAmount = (debt) => {
  const today = new Date();
  const due = new Date(debt.due_date);

  const principal = Number(debt.current_balance);
  const rate = debt.interest_rate / 100;

  if (today <= due) return principal;

  const daysLate = (today - due) / (1000 * 60 * 60 * 24);
  const interest = principal * rate * (daysLate / 365);

  return principal + interest;
};

const calculateMonthlyPayment = (debt) => {
  const P = Number(debt.current_balance);
  const r = debt.interest_rate / 100 / 12;

  const totalMonths =
    (new Date(debt.due_date) - new Date(debt.start_date)) /
    (1000 * 60 * 60 * 24 * 30);

  if (!r) return P / totalMonths;

  return (
    (P * r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1)
  );
};

const calculateAnnualPayment = (debt) => {
  const P = Number(debt.current_balance);
  const r = debt.interest_rate / 100;
  return P * (1 + r);
};

// ------------------ PAYMENT CHECK ------------------

const hasPaidThisPeriod = (debt, payments) => {
  const today = new Date();

  return payments.some((p) => {
    if (p.debt_id !== debt._id) return false;

    const paymentDate = new Date(p.payment_date);

    if (debt.frequency === "monthly") {
      return (
        paymentDate.getMonth() === today.getMonth() &&
        paymentDate.getFullYear() === today.getFullYear()
      );
    }

    if (debt.frequency === "annually") {
      return paymentDate.getFullYear() === today.getFullYear();
    }

    if (debt.frequency === "one-time payment") {
      return true; // already paid
    }

    return false;
  });
};

// ------------------ MAIN LOGIC ------------------

const getUpcomingPayments = (debts, payments) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);
  next30Days.setHours(0, 0, 0, 0);

  return debts
    .map((debt) => {
      let paymentDate = null;
      let amount = 0;

      const paid = hasPaidThisPeriod(debt, payments);

      // ONE-TIME
      if (debt.frequency === "one-time payment") {
        const due = new Date(debt.due_date);
        due.setHours(0, 0, 0, 0);

        if (due >= today && due <= next30Days) {
          paymentDate = due;
          amount = calculateOneOffAmount(debt);
        }
      }

      // MONTHLY
      else if (debt.frequency === "monthly") {
        const next = new Date();
        next.setMonth(next.getMonth() + 1);
        next.setHours(0, 0, 0, 0);

        if (next >= today && next <= next30Days) {
          paymentDate = next;
          amount = calculateMonthlyPayment(debt);
        }
      }

      // ANNUAL
      else if (debt.frequency === "annually") {
        const next = new Date(debt.start_date);

        while (next < today) {
          next.setFullYear(next.getFullYear() + 1);
        }

        next.setHours(0, 0, 0, 0);

        if (next >= today && next <= next30Days) {
          paymentDate = next;
          amount = calculateAnnualPayment(debt);
        }
      }

      amount = Math.min(amount, Number(debt.current_balance || 0));

      if (paymentDate && !paid && debt.current_balance > 0) {
        return {
          ...debt,
          paymentDate,
          amount,
        };
      }

      return null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
};

// ------------------ COMPONENT ------------------

const UpcomingCard = ({ debts, payments = [], onSuccess }) => {
  const upcomingPayments = getUpcomingPayments(debts, payments);
  const [openId, setOpenId] = useState(null);

  if (upcomingPayments.length === 0)
    return <p className="text-gray-400">No upcoming payments 🎉</p>;

  return (
    <div className="flex flex-col gap-2">
      {upcomingPayments.map((payment) => (
        <div key={payment._id}>
          <div
            className={`bg-white border rounded-2xl px-4 py-3 transition-colors shadow-sm cursor-pointer ${
              openId === payment._id
                ? "border-green-300"
                : "border-gray-100 hover:border-gray-300"
            }`}
            onClick={() =>
              setOpenId(openId === payment._id ? null : payment._id)
            }
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center cursor-pointer">
              {/* NAME */}
              <div className="sm:w-[160px] sm:shrink-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {payment.label}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {payment.category}
                </p>
              </div>

              {/* AMOUNT */}
              <div className="sm:w-[130px] sm:shrink-0">
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(payment.amount)}
                </p>
                <p className="text-xs text-gray-400">
                  Remaining: {formatCurrency(payment.current_balance)}
                </p>
              </div>

              {/* BADGE */}
              <div className="sm:w-[90px] sm:shrink-0">
                <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-orange-500 text-white">
                  Due Soon
                </span>
              </div>

              {/* DATE */}
              <div className="sm:flex-1">
                <p className="text-[10px] text-gray-400 uppercase font-bold">
                  Due
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {formatDate(payment.paymentDate)}
                </p>
              </div>

              {/* ACTION BUTTON — stops click bubbling to card toggle */}
              <div
                className="flex gap-2 sm:shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <ActionButton
                  variant="secondary"
                  onClick={() =>
                    setOpenId(openId === payment._id ? null : payment._id)
                  }
                >
                  <CreditCard size={14} />
                  {/* {openId === payment._id ? "Close" : "Pay"} */}
                </ActionButton>
              </div>
            </div>
          </div>

          {openId === payment._id && (
            <div className="mb-2">
              <PaymentForm
                payment={payment}
                onClose={() => setOpenId(null)}
                onSuccess={onSuccess}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UpcomingCard;
