import React from "react";

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

// ------------------ PAYMENT CHECK ------------------

const hasPaymentAfterDate = (debt, payments, targetDate) => {
  return payments.some((p) => {
    if (p.debt_id !== debt._id) return false;

    const paymentDate = new Date(p.payment_date);
    return paymentDate >= targetDate;
  });
};

// ------------------ MAIN LOGIC ------------------

const getOverduePayments = (debts, payments) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return debts
    .map((debt) => {
      let lastDueDate = null;

      // ONE-TIME
      if (debt.frequency === "one-time payment") {
        lastDueDate = new Date(debt.due_date);
      }

      // MONTHLY
      else if (debt.frequency === "monthly") {
        lastDueDate = new Date();
        lastDueDate.setMonth(lastDueDate.getMonth() - 1);
      }

      // ANNUAL
      else if (debt.frequency === "annually") {
        lastDueDate = new Date(debt.start_date);

        while (lastDueDate < today) {
          lastDueDate.setFullYear(lastDueDate.getFullYear() + 1);
        }

        lastDueDate.setFullYear(lastDueDate.getFullYear() - 1);
      }

      if (!lastDueDate) return null;

      lastDueDate.setHours(0, 0, 0, 0);

      // 🔥 KEY CHECK
      const paidAfter = hasPaymentAfterDate(debt, payments, lastDueDate);

      if (lastDueDate < today && !paidAfter && debt.current_balance > 0) {
        return {
          ...debt,
          paymentDate: lastDueDate,
          amount: debt.current_balance,
        };
      }

      return null;
    })
    .filter(Boolean);
};

// ------------------ COMPONENT ------------------

const OverduePaymentCard = ({ debts, payments = [], onPay }) => {
  const overduePayments = getOverduePayments(debts, payments);

  if (overduePayments.length === 0) {
    return null; // don't show section if empty
  }

  return (
    <div className="flex flex-col gap-3">
      {overduePayments.map((payment) => (
        <div
          key={payment._id}
          className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 shadow-sm"
        >
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
            <p className="text-lg font-semibold text-red-600">
              {formatCurrency(payment.amount)}
            </p>
            <p className="text-xs text-gray-400">
              Remaining: {formatCurrency(payment.current_balance)}
            </p>
          </div>

          {/* BADGE */}
          <span className="text-[10px] uppercase font-bold px-3 py-1 rounded-full bg-red-500 text-white">
            Overdue
          </span>

          {/* DATE */}
          <div className="flex-1 text-right">
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              Missed
            </p>
            <p className="text-sm font-medium text-red-600">
              {formatDate(payment.paymentDate)}
            </p>
          </div>

          {/* PAY BUTTON */}
          <button
            onClick={() => onPay?.(payment)}
            className="px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600"
          >
            Pay Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default OverduePaymentCard;
