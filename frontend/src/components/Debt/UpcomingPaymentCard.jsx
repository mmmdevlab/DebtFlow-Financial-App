import React from "react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(amount);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-SG", {
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

const getUpcomingPayments = (debts) => {
  const today = new Date();
  const next30Days = new Date();
  next30Days.setDate(today.getDate() + 30);

  return debts
    .map((debt) => {
      let paymentDate = null;
      let amount = 0;

      // ONE-OFF
      if (debt.frequency === "one-time payment") {
        const due = new Date(debt.due_date);

        if (due >= today && due <= next30Days) {
          paymentDate = due;
          amount = calculateOneOffAmount(debt);
        }
      }

      // MONTHLY
      else if (debt.frequency === "monthly") {
        const next = new Date();
        next.setMonth(next.getMonth() + 1);

        if (next >= today && next <= next30Days) {
          paymentDate = next;
          amount = calculateMonthlyPayment(debt);
        }
      }

      // ANNUAL
      else if (debt.frequency === "annually") {
        const next = new Date(debt.start_date);

        // move to next year cycle
        while (next < today) {
          next.setFullYear(next.getFullYear() + 1);
        }

        if (next >= today && next <= next30Days) {
          paymentDate = next;
          amount = calculateAnnualPayment(debt);
        }
      }

      if (paymentDate) {
        return { ...debt, paymentDate, amount };
      }

      return null;
    })
    .filter(Boolean);
};

// ------------------ COMPONENT ------------------

const UpcomingPaymentCard = ({ debts }) => {
  const upcomingPayments = getUpcomingPayments(debts);

  if (upcomingPayments.length === 0) {
    return <p className="text-gray-400">No upcoming payments 🎉</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {upcomingPayments.map((payment) => (
        <div
          key={payment._id}
          className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm"
        >
          {/* NAME */}
          <div className="min-w-[110px]">
            <p className="text-sm font-bold text-gray-900">
              {payment.label}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {payment.category}
            </p>
          </div>

          {/* AMOUNT */}
          <span className="text-lg font-semibold text-gray-900 min-w-[100px]">
            {formatCurrency(payment.amount)}
          </span>

          {/* BADGE */}
          <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-orange-500 text-white">
            Due Soon
          </span>

          {/* DATE */}
          <div className="flex-1 text-right">
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              Due
            </p>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(payment.paymentDate)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingPaymentCard;