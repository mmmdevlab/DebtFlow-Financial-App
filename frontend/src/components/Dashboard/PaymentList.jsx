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
  const P = Number(debt.principle_amount);
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

  const next30Days = new Date(today);
  next30Days.setDate(today.getDate() + 30);

  return debts
    .map((debt) => {
      let amount = 0;

      // ---------- ONE-TIME ----------
      if (debt.frequency === "one-time payment") {
        const dueDate = new Date(debt.due_date);
        amount = calculateOneOffAmount(debt);

        if (amount <= 0) return null;

        return {
          ...debt,
          paymentDate: dueDate,
          amount,
          isOverdue: dueDate < today,
        };
      }

      // ---------- MONTHLY (FIXED) ----------
      if (debt.frequency === "monthly") {
        const startDate = new Date(debt.start_date);
        const billingDay = startDate.getDate();

        // current cycle start
        const cycleStart = new Date(today);
        cycleStart.setDate(billingDay);
        cycleStart.setHours(0, 0, 0, 0);

        if (today.getDate() < billingDay) {
          cycleStart.setMonth(cycleStart.getMonth() - 1);
        }

        // next cycle
        const nextCycle = new Date(cycleStart);
        nextCycle.setMonth(nextCycle.getMonth() + 1);

        // check if paid in this cycle
        const paidThisCycle = payments.some((p) => {
          if (String(p.debt_id) === String(debt._id)) return false;
          const d = new Date(p.payment_date);
          return d >= cycleStart && d < nextCycle;
        });

        amount = calculateMonthlyPayment(debt);

        // not paid
        if (!paidThisCycle) {
          return {
            ...debt,
            paymentDate: cycleStart,
            amount,
            isOverdue: today > cycleStart,
          };
        }

        // paid
        if (paidThisCycle) {
          const upcomingDate = new Date(nextCycle);

          // 🔑 ONLY show next payment AFTER current cycle has passed
          if (today >= nextCycle) {
            if (upcomingDate <= next30Days) {
              return {
                ...debt,
                paymentDate: upcomingDate,
                amount,
                isOverdue: false,
              };
            }
          }

  return null;
}

        return null;
      }

      // ---------- ANNUAL ----------
      if (debt.frequency === "annually") {
        const startDate = new Date(debt.start_date);

        const lastPayment = payments
          .filter((p) => p.debt_id === debt._id)
          .sort(
            (a, b) =>
              new Date(b.payment_date) - new Date(a.payment_date),
          )[0];

        let dueDate;

        if (lastPayment) {
          dueDate = new Date(lastPayment.payment_date);
          dueDate.setFullYear(dueDate.getFullYear() + 1);
        } else {
          dueDate = new Date(startDate);
        }

        amount = calculateAnnualPayment(debt);

        const isOverdue = dueDate < today;
        const isUpcoming =
          dueDate >= today && dueDate <= next30Days;

        if (!isOverdue && !isUpcoming) return null;

        return {
          ...debt,
          paymentDate: dueDate,
          amount,
          isOverdue,
        };
      }

      return null;
    })
    .filter((p) => p && p.amount > 0 && p.current_balance > 0)
    .sort((a, b) => new Date(a.paymentDate) - new Date(b.paymentDate));
};

// ------------------ COMPONENT (UNCHANGED) ------------------

const PaymentList = ({ debts, payments = [], onSuccess }) => {
  const allPayments = getAllPayments(debts, payments);
  const [openId, setOpenId] = useState(null);

  const overdue = allPayments.filter((p) => p.isOverdue);
  const upcoming = allPayments.filter((p) => !p.isOverdue);

  if (overdue.length === 0 && upcoming.length === 0) {
    return <p className="text-gray-400 text-center py-10">No payments</p>;
  }

  const renderPaymentItem = (item, type) => {
    const isOverdue = type === "overdue";
    const isOpen = openId === item._id;

    const theme = isOverdue
      ? {
          border: isOpen
            ? "border-red-400 bg-red-50"
            : "border-red-200 bg-red-50 hover:border-red-300",
          text: "text-red-600",
          badge: "bg-red-500 text-red-50",
          button: "danger",
        }
      : {
          border: isOpen
            ? "border-blue-400 bg-blue-50"
            : "border-blue-200 bg-blue-50 hover:border-blue-300",
          text: "text-gray-900",
          badge: "bg-blue-500 text-blue-50",
          button: "secondary",
        };

    return (
      <div key={item._id} className="w-full">
        <div
          className={`rounded-2xl px-4 py-3 border shadow-sm transition-all cursor-pointer ${theme.border}`}
          onClick={() => setOpenId(isOpen ? null : item._id)}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="sm:w-[160px] sm:shrink-0">
              <p className="text-sm font-bold truncate">{item.label}</p>
              <p className="text-xs text-gray-500 capitalize">
                {item.category}
              </p>
            </div>

            <div className="sm:w-[130px] sm:shrink-0">
              <p
                className={`text-lg font-semibold ${isOverdue ? theme.text : "text-gray-900"}`}
              >
                {formatCurrency(item.amount)}
              </p>
            </div>

            <div className="sm:w-[90px] sm:shrink-0">
              <span
                className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full whitespace-nowrap ${theme.badge}`}
              >
                {isOverdue ? "Overdue" : "To pay"}
              </span>
            </div>

            <div className="sm:flex-1">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                {isOverdue ? "Missed" : "Due"}
              </p>
              <p
                className={`text-sm font-bold ${isOverdue ? "text-red-600" : "text-gray-900"}`}
              >
                {formatDate(item.paymentDate)}
              </p>
            </div>

            <div
              className="flex gap-2 sm:shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <ActionButton
                variant={theme.button}
                onClick={() => setOpenId(isOpen ? null : item._id)}
              >
                <CreditCard size={14} />
              </ActionButton>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="mt-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-inner">
            <PaymentForm
              debt={item}
              onClose={() => setOpenId(null)}
              onSuccess={onSuccess}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {overdue.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900">Overdue Payments</h2>
          <div className="flex flex-col gap-3">
            {overdue.map((item) => renderPaymentItem(item, "overdue"))}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Payments</h2>
          <div className="flex flex-col gap-3">
            {upcoming.map((item) => renderPaymentItem(item, "upcoming"))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentList;