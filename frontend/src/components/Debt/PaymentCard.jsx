import { Pencil, Trash2 } from "lucide-react";
import ActionButton from "../UI/ActionButton";

const PaymentCard = ({ payment, handleEdit, handleDelete }) => {
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

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-base font-semibold text-gray-900">
            {payment.label}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{payment.category}</p>
        </div>
        <div className="flex gap-2">
          <ActionButton onClick={() => handleEdit(payment)}>
            <Pencil size={14} />
          </ActionButton>
          <ActionButton
            variant="danger"
            onClick={() => handleDelete(payment._id)}
          >
            <Trash2 size={14} />
          </ActionButton>
        </div>
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
            {formatCurrency(payment.current_balance)}
          </p>
        </div>
        <div>
          <p className={labelStyle}>Due Date</p>
          <p className={valueStyle}>{formatDate(payment.due_date)}</p>
        </div>
      </div>
    </div>
  );
};

const PaymentHistoryLog = ({ payments = [], handleEdit, handleDelete }) => {
  return (
    <div className="flex flex-col gap-5 max-w-xl mx-auto border border-gray-200 rounded-xl p-6 bg-white shadow-md">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          All Payment History
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {payments.length} record{payments.length !== 1 ? "s" : ""}
        </p>
      </div>

      {payments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No payment records yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {payments.map((payment) => (
            <PaymentCard
              key={payment._id}
              payment={payment}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryLog;
