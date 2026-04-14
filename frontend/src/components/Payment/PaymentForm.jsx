import { useState } from "react";
import { usePayments } from "../../context/PaymentContext";

const labelStyle =
  "text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1";
const inputStyle =
  "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition";

const PaymentForm = ({ debt, onClose, onSuccess, editingPayment }) => {
  const { addPayment, updatePayment } = usePayments();
  const isEditing = !!editingPayment;

  const [formData, setFormData] = useState({
    amount: editingPayment?.amount ?? "",
    payment_date: editingPayment?.payment_date
      ? editingPayment.payment_date.slice(0, 10)
      : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updatePayment(editingPayment._id, formData);
    } else {
      if (!debt?._id) {
        console.error("PaymentForm: debt prop is missing or has no _id", debt);
        return;
      }
      await addPayment({
        debtId: debt._id,
        amount: formData.amount,
        payment_date: formData.payment_date,
      });
    }

    onSuccess?.();
    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-3 pt-4 border-t border-gray-100"
    >
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className={labelStyle}>Amount *</span>
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Date *</span>
          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 py-2.5 bg-green-500 text-white rounded-full text-sm font-bold hover:bg-green-600 transition"
        >
          {isEditing ? "Update" : "Log Payment"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-full border border-gray-200 text-sm font-bold text-gray-400 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
