import { useState } from "react";
import { usePayments } from "../../context/PaymentContext";

const PaymentForm = ({ debt, onClose, onSuccess }) => {
  const { addPayment } = usePayments();

  const [formData, setFormData] = useState({
    amount: "",
    payment_date: "",
  });

  const labelStyle =
    "text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1";

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPayment({
      debtId: debt._id,
      amount: formData.amount,
      payment_date: formData.payment_date,
    });
    onSuccess?.();
    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full sm:max-w-xl mx-auto border border-gray-200 rounded-xl p-6 bg-white shadow-md"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Log Payment</h1>
        {debt && (
          <p className="text-sm text-gray-400 mt-1">
            Recording payment for{" "}
            <span className="text-gray-600 font-medium">{debt.label}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        <label className="flex flex-col min-w-0">
          <span className={labelStyle}>Date of Payment *</span>
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

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 rounded-full border border-gray-200 text-sm font-bold text-gray-400 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-3 bg-green-500 text-white rounded-full text-sm font-bold hover:bg-green-600 transition shadow-lg shadow-green-100"
        >
          Log Payment
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
