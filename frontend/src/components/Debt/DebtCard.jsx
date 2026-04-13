import { useState } from "react";
import { Pencil, Trash2, CreditCard } from "lucide-react";
import ActionButton from "../UI/ActionButton";
import AddDebtForm from "./AddDebtForm";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" }).format(
    amount,
  );

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getStatus = (debt) => {
  if (debt.status === "paidOff") return "paidOff";
  if (new Date(debt.due_date) < new Date()) return "overdue";
  return "active";
};

const statusConfig = {
  overdue: {
    label: "Overdue",
    badge: "bg-red-500 text-red-50",
    dateClass: "text-red-500",
  },
  active: {
    label: "To pay",
    badge: "bg-blue-500 text-blue-50",
    dateClass: "text-gray-900",
  },
  paidOff: {
    label: "Paid off",
    badge: "bg-green-600 text-green-50",
    dateClass: "text-gray-900",
  },
};

const DebtCard = ({
  debt,
  handleDelete,
  onLogPayment,
  view = "allDebts",
  onUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const status = getStatus(debt);
  const { label, badge, dateClass } = statusConfig[status];

  return (
    <div
      className={`bg-white border rounded-2xl px-4 py-3 transition-colors shadow-sm ${
        isEditing ? "border-green-300" : "border-gray-100 hover:border-gray-300"
      }`}
    >
      <div
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 cursor-pointer"
        onClick={() => view === "allDebts" && setIsEditing((prev) => !prev)}
      >
        <div className="sm:w-[160px] sm:shrink-0">
          <p className="text-sm font-bold text-gray-900 truncate">
            {debt.label}
          </p>
          <p className="text-xs text-gray-400 capitalize">{debt.category}</p>
        </div>

        <div className="sm:w-[130px] sm:shrink-0">
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(debt.current_balance)}
          </p>
        </div>

        <div className="sm:w-[90px] sm:shrink-0">
          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full whitespace-nowrap ${badge}`}
          >
            {label}
          </span>
        </div>

        <div className="sm:flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
            Due
          </p>
          <p className={`text-sm font-bold ${dateClass}`}>
            {formatDate(debt.due_date)}
          </p>
        </div>

        <div
          className="flex gap-2 sm:shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {view === "allDebts" ? (
            <>
              <ActionButton onClick={() => setIsEditing((prev) => !prev)}>
                <Pencil size={14} />
              </ActionButton>
              <ActionButton
                variant="danger"
                onClick={() => handleDelete(debt._id)}
              >
                <Trash2 size={14} />
              </ActionButton>
            </>
          ) : (
            <ActionButton
              variant="secondary"
              onClick={() => onLogPayment(debt)}
            >
              <CreditCard size={14} />
              Pay Now
            </ActionButton>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-3 pt-4 border-t border-gray-100">
          <AddDebtForm
            selectedData={debt}
            isEditing={true}
            onSubmit={() => {
              setIsEditing(false);
              onUpdated?.();
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DebtCard;
