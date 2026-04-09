import React from "react";
import { Pencil, Trash2, CreditCard } from "lucide-react";
import ActionButton from "../UI/ActionButton";

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
  handleEdit,
  handleDelete,
  onLogPayment,
  view = "allDebts",
}) => {
  const status = getStatus(debt);
  const { label, badge, dateClass } = statusConfig[status];

  // const handleCardClick = () => {
  //   if (view === "dashboard") {
  //     onLogPayment?.(debt);
  //   } else {
  //     handleEdit?.(debt);
  //   }
  // };

  return (
    <div
      // onClick={handleCardClick}
      className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 cursor-pointer hover:border-gray-300 transition-colors shadow-sm"
    >
      <div className="min-w-[110px]">
        <p className="text-sm font-bold text-gray-900">{debt.label}</p>
        <p className="text-xs text-gray-400 capitalize">{debt.category}</p>
      </div>

      <span className="text-lg font-semibold text-gray-900 min-w-[100px]">
        {formatCurrency(debt.current_balance)}
      </span>

      <span
        className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full whitespace-nowrap ${badge}`}
      >
        {label}
      </span>

      <div className="flex-1 text-right">
        <p className="text-[10px] text-gray-400 uppercase font-bold">Due</p>
        <p className={`text-sm font-medium ${dateClass}`}>
          {formatDate(debt.due_date)}
        </p>
      </div>

      <div className="flex gap-2">
        {view === "allDebts" ? (
          <>
            <ActionButton onClick={(e) => {
              e.stopPropagation();
              handleEdit(debt);
              }}>
              <Pencil size={14} />
            </ActionButton>
            <ActionButton variant="danger" onClick={(e) => {
              e.stopPropagation();
              handleDelete(debt._id);
              }}>
              <Trash2 size={14} />
            </ActionButton>
          </>
        ) : (
          <ActionButton variant="secondary" onClick={() => onLogPayment(debt)}>
            <CreditCard size={14} />
            Pay Now
          </ActionButton>
        )}
      </div>
    </div>
  );
};

export default DebtCard;
