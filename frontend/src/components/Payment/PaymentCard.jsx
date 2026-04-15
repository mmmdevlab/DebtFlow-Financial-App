import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ActionButton from "../UI/ActionButton";
import { usePayments } from "../../context/PaymentContext";
import PaymentForm from "./PaymentForm";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(amount);

const PaymentCard = ({ payment, debt }) => {
  const { deletePayment } = usePayments();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={`bg-white border rounded-2xl px-4 py-3 transition-colors shadow-sm cursor-pointer ${
        isEditing ? "border-green-300" : "border-gray-100 hover:border-gray-300"
      }`}
    >
      <div
        className="flex flex-col gap-5 sm:flex-row sm:items-center cursor-pointer"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        <div className="sm:w-[160px] sm:shrink-0">
          <p className="text-sm font-bold text-gray-900 truncate">
            {debt?.label ?? "Unknown debt"}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {debt?.category ?? "—"}
          </p>
        </div>

        <div className="sm:w-[130px] sm:shrink-0">
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(payment.amount)}
          </p>
        </div>

        <div className="sm:flex-1">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
            Paid on
          </p>
          <p className="text-sm font-bold text-gray-900">
            {formatDate(payment.payment_date)}
          </p>
        </div>

        <div
          className="flex gap-2 sm:shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <ActionButton onClick={() => setIsEditing((prev) => !prev)}>
            <Pencil size={14} />
          </ActionButton>
          <ActionButton
            variant="danger"
            onClick={() => deletePayment(payment._id)}
          >
            <Trash2 size={14} />
          </ActionButton>
        </div>
      </div>

      {isEditing && (
        <PaymentForm
          debt={debt}
          editingPayment={payment}
          onClose={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default PaymentCard;
