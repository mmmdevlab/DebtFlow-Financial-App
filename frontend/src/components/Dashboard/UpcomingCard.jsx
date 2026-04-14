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
  const P = Number(debt.principal);
  const r = debt.interest_rate / 100 / 12;

  const totalMonths =
    (new Date(debt.due_date) - new Date(debt.start_date)) /
    (1000 * 60 * 60 * 24 * 30);

  if (!r) return P / totalMonths;

  return (
    (P * r * Math.pow(1 + r, totalMonths)) /
    (Math.pow(1 + r, totalMonths) - 1)
  );
};

const calculateAnnualPayment = (debt) => {
  const P = Number(debt.current_balance);
  const r = debt.interest_rate / 100;
  return P * (1 + r);
};

// ------------------ MAIN LOGIC ------------------

export const getAllPayments = (debts, payments) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);

  return debts
    .map((debt) => {
      let paymentDate = null;
      let amount = 0;

      // ---------- ONE-TIME ----------
      if (debt.frequency === "one-time payment") {
        const due = new Date(debt.due_date);

      if (due < today) {
        const amount = Math.min(
        calculateOneOffAmount(debt),
        Number(debt.current_balance || 0)
      );

        if (amount <= 0) return null; 
        return {
          ...debt,
          paymentDate: due,
          amount,
          isOverdue: true,
        };
      }
        
      if (due >= today && due <= next30Days) {
        const amount = Math.min(
        calculateOneOffAmount(debt),
        Number(debt.current_balance || 0));

        if (amount <= 0) return null; 
        return {
          ...debt,
          paymentDate: due,
          amount,
          isOverdue: false,
        }}

      // ---------- MONTHLY ----------
      else if (debt.frequency === "monthly") {
        const next = new Date();
        next.setMonth(next.getMonth() + 1);

        const last = new Date();
        last.setMonth(last.getMonth() - 1);

        // check overdue
        const paidAfterLast = payments.some(
          (p) =>
            p.debt_id === debt._id &&
            new Date(p.payment_date) >= last
        );

        if (!paidAfterLast) {
          const monthly = calculateMonthlyPayment(debt);

          const paidThisCycle = payments
            .filter((p) => p.debt_id === debt._id)
            .filter((p) => new Date(p.payment_date) >= last)
            .reduce((sum, p) => sum + p.amount, 0);

          amount = Math.max(0, monthly - paidThisCycle);

          if (amount <= 0) return null;

          return {
            ...debt,
            paymentDate: last,
            amount,
            isOverdue: true,
          };
        }

        // upcoming
        if (next >= today && next <= next30Days) {
          return {
            ...debt,
            paymentDate: next,
            amount: calculateMonthlyPayment(debt),
            isOverdue: false,
          };
        }
      }

      // ---------- ANNUAL ----------
      else if (debt.frequency === "annually") {
        const next = new Date(debt.start_date);

        while (next < today) {
          next.setFullYear(next.getFullYear() + 1);
        }

        const last = new Date(next);
        last.setFullYear(last.getFullYear() - 1);

        const paidAfterLast = payments.some(
          (p) =>
            p.debt_id === debt._id &&
            new Date(p.payment_date) >= last
        );

        if (!paidAfterLast && last < today) {
          return {
            ...debt,
            paymentDate: last,
            amount: calculateAnnualPayment(debt),
            isOverdue: true,
          };
        }

        if (next >= today && next <= next30Days) {
          return {
            ...debt,
            paymentDate: next,
            amount: calculateAnnualPayment(debt),
            isOverdue: false,
          };
        }
      }

      return null;
    }})
    .filter((p) => p && p.amount > 0 && p.current_balance > 0)
    .sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
};

// ------------------ COMPONENT ------------------

const UpcomingCard = ({ debts, payments = [], onSuccess }) => {
  const allPayments = getAllPayments(debts, payments);
  const [openId, setOpenId] = useState(null);

  const overdue = allPayments.filter((p) => p.isOverdue);
  const upcoming = allPayments.filter((p) => !p.isOverdue);

  if (overdue.length === 0 && upcoming.length === 0) {
    return <p className="text-gray-400">No payments 🎉</p>;
  }

  return (
    <div className="flex flex-col gap-4">

      {/* 🔴 OVERDUE */}
      {overdue.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-red-500 font-bold uppercase text-xs">
            ⚠ Overdue Payments
          </p>

          {overdue.map((item) => (
            <div key={item._id}>
              <div
                className={`rounded-2xl px-4 py-3 border shadow-sm cursor-pointer
                  ${openId === item._id
                    ? "border-red-400 bg-red-50"
                    : "border-red-200 bg-red-50 hover:border-red-300"
                  }`}
                onClick={() =>
                  setOpenId(openId === item._id ? null : item._id)
                }
              >
                <div className="flex items-center gap-4">

                  <div className="min-w-[110px]">
                    <p className="text-sm font-bold">{item.label}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {item.category}
                    </p>
                  </div>

                  <span className="text-lg font-semibold text-red-600">
                    {formatCurrency(item.amount)}
                  </span>

                  <span className="text-[10px] px-3 py-1 bg-red-500 text-white rounded-full">
                    Overdue
                  </span>

                  <div className="flex-1 text-right">
                    <p className="text-xs text-gray-400">Missed</p>
                    <p className="text-sm text-red-600">
                      {formatDate(item.paymentDate)}
                    </p>
                  </div>

                  <ActionButton variant="danger">
                    <CreditCard size={14} />
                  </ActionButton>
                </div>
              </div>

              {openId === item._id && (
                <PaymentForm
                  debt={item}
                  onClose={() => setOpenId(null)}
                  onSuccess={onSuccess}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* 🟠 UPCOMING */}
      {upcoming.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 font-medium text-sm">
            Upcoming Payments
          </p>

          {upcoming.map((item) => (
            <div key={item._id}>
              <div
                className={`bg-white border rounded-2xl px-4 py-3 shadow-sm cursor-pointer
                  ${openId === item._id
                    ? "border-green-300"
                    : "border-gray-100 hover:border-gray-300"
                  }`}
                onClick={() =>
                  setOpenId(openId === item._id ? null : item._id)
                }
              >
                <div className="flex items-center gap-4">

                  <div className="min-w-[110px]">
                    <p className="text-sm font-bold">{item.label}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {item.category}
                    </p>
                  </div>

                  <span className="text-lg font-semibold">
                    {formatCurrency(item.amount)}
                  </span>

                  <span className="text-[10px] px-3 py-1 bg-orange-500 text-white rounded-full">
                    Due Soon
                  </span>

                  <div className="flex-1 text-right">
                    <p className="text-xs text-gray-400">Due</p>
                    <p className="text-sm">
                      {formatDate(item.paymentDate)}
                    </p>
                  </div>

                  <ActionButton variant="secondary">
                    <CreditCard size={14} />
                  </ActionButton>
                </div>
              </div>

              {openId === item._id && (
                <PaymentForm
                  debt={item}
                  onClose={() => setOpenId(null)}
                  onSuccess={onSuccess}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingCard;