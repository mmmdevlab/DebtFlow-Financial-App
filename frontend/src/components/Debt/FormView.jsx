const FormView = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  onCancel,
}) => {
  const labelStyle =
    "text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1";

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 max-w-xl min-w-auto border border-gray-200 rounded-xl p-6 bg-white shadow-md"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Add New Debt</h1>
        <p className="text-sm text-gray-400 mt-1">
          Enter the details of your liability below
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="flex flex-col col-span-full">
          <span className={labelStyle}>Debt Name</span>
          <input
            type="text"
            name="label"
            placeholder="e.g. HDB Mortgage"
            value={formData.label}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Category</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="mortgage">Mortgage</option>
            <option value="creditCard">Credit Card</option>
            <option value="loan">Loan</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Principal Amount</span>
          <input
            type="number"
            name="principle_amount"
            placeholder="0.00"
            value={formData.principle_amount}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Interest Rate (%)</span>
          <input
            type="number"
            step="0.01"
            name="interest_rate"
            placeholder="e.g. 2.5"
            value={formData.interest_rate}
            onChange={handleChange}
            className={inputStyle}
          />
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Current Balance</span>
          <input
            type="number"
            name="current_balance"
            placeholder="0.00"
            value={formData.current_balance}
            onChange={handleChange}
            className={inputStyle}
          />
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Start Date</span>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className={inputStyle}
          />
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Due Date (Repayment)</span>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className={inputStyle}
          />
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Frequency</span>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
            <option value="one-time payment">One-time payment</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className={labelStyle}>Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputStyle}
          >
            <option value="active">Active</option>
            <option value="paidOff">Paid Off</option>
          </select>
        </label>
      </div>

      {isEditing ? (
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition shadow-lg shadow-green-100"
          >
            Update Debt
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-full border border-gray-200 text-sm font-bold text-gray-400 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition mt-4 shadow-lg shadow-green-100"
        >
          Add Debt Record
        </button>
      )}
    </form>
  );
};

export default FormView;
