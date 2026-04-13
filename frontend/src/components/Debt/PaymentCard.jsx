import { Trash2 } from "lucide-react";
import ActionButton from "../UI/ActionButton";
import { usePayments } from "../../context/PaymentContext";

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

const labelStyle =
  "text-xs font-semibold tracking-widest uppercase text-gray-400";
const valueStyle = "text-sm text-gray-800 mt-0.5";

const PaymentCard = ({ payment, debt }) => {
  const { deletePayment } = usePayments();

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-base font-semibold text-gray-900">
            {debt?.label ?? "Unknown debt"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 capitalize">
            {debt?.category ?? "—"}
          </p>
        </div>
        <ActionButton
          variant="danger"
          onClick={() => deletePayment(payment._id)}
        >
          <Trash2 size={14} />
        </ActionButton>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div>
          <p className={labelStyle}>Amount Paid</p>
          <p className={valueStyle}>{formatCurrency(payment.amount)}</p>
        </div>
        <div>
          <p className={labelStyle}>Date of Payment</p>
          <p className={valueStyle}>{formatDate(payment.payment_date)}</p>
        </div>
        <div>
          <p className={labelStyle}>Remaining Balance</p>
          <p className={valueStyle}>
            {formatCurrency(debt?.current_balance ?? 0)}
          </p>
        </div>
        <div>
          <p className={labelStyle}>Due Date</p>
          <p className={valueStyle}>
            {debt?.due_date ? formatDate(debt.due_date) : "—"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
