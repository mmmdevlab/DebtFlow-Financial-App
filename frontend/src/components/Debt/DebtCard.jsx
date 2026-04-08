import { Pencil, Trash2 } from "lucide-react";

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

const DebtCard = ({ debt, onEdit, onDelete }) => {
  const status = getStatus(debt);
  const { label, badge, dateClass } = statusConfig[status];
  return (
    <div
      onClick={() => onEdit(debt)}
      className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-4 py-3 cursor-pointer hover:border-gray-300 transition-colors"
    >
      <div className="min-w-[110px]">
        <p className="text-sm font-medium text-gray-900">{debt.label}</p>
        <p className="text-xs text-gray-400 capitalize">{debt.category}</p>
      </div>
      <span className="text-lg font-medium text-gray-900 min-w-[90px]">
        {formatCurrency(debt.current_balance)}
      </span>
      <span
        className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${badge}`}
      >
        {label}
      </span>
      <div className="flex-1 text-right">
        <p className="text-xs text-gray-400">Due</p>
        <p className={`text-sm font-medium ${dateClass}`}>
          {formatDate(debt.due_date)}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(debt);
        }}
        className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-gray-700 transition flex-shrink-0"
      >
        <Pencil size={15} color="white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(debt._id);
        }}
        className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-gray-700 transition flex-shrink-0"
      >
        <Trash2 size={15} color="white" />
      </button>
    </div>
  );
};

export default DebtCard;
