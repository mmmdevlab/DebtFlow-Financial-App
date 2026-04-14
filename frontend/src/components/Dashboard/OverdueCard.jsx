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

const OverdueCard = ({ debts, payments = [], onSuccess }) => {
  const overduePayments = getOverduePayments(debts, payments);
  const [openId, setOpenId] = useState(null);

  if (overduePayments.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {overduePayments.map((payment) => (
        <div key={payment._id}>
          <div
            className={`bg-red-50 border rounded-2xl px-4 py-3 transition-colors shadow-sm cursor-pointer ${
              openId === payment._id
                ? "border-red-400"
                : "border-red-200 hover:border-red-300"
            }`}
            onClick={() =>
              setOpenId(openId === payment._id ? null : payment._id)
            }
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center cursor-pointer">
              <div className="sm:w-[160px] sm:shrink-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {payment.label}
                </p>
                <p className="text-xs text-gray-600 capitalize">
                  {payment.category}
                </p>
              </div>

              <div className="sm:w-[130px] sm:shrink-0">
                <p className="text-lg font-semibold text-red-600">
                  {formatCurrency(payment.amount)}
                </p>
                <p className="text-xs text-gray-600">
                  Remaining: {formatCurrency(payment.current_balance)}
                </p>
              </div>

              <div className="sm:flex-1">
                <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-red-500 text-white">
                  Overdue
                </span>
              </div>

              <div className="sm:flex-1">
                <p className="text-[10px] text-gray-600 uppercase font-bold">
                  Due
                </p>
                <p className="text-sm font-bold text-red-600">
                  {formatDate(payment.paymentDate)}
                </p>
              </div>

              <div
                className="flex gap-2 sm:shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <ActionButton
                  variant="danger"
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
                className="flex mt-10"
                payment={payment}
                onClose={() => setOpenId(null)}
                onSuccess={onSuccess}
                variant="overdue"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OverdueCard;
