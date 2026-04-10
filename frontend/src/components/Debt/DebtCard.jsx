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
    <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 cursor-pointer hover:border-gray-300 transition-colors shadow-sm">
      <div
        // onClick={handleCardClick}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0"
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

        {/* Due date */}
        <div className="sm:flex-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
            Due
          </p>
          <p className={`text-sm font-bold ${dateClass}`}>
            {formatDate(debt.due_date)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 sm:shrink-0">
          {view === "allDebts" ? (
            <>
              <ActionButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(debt);
                }}
              >
                <Pencil size={14} />
              </ActionButton>
              <ActionButton
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(debt._id);
                }}
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
    </div>
  );
};

export default DebtCard;
