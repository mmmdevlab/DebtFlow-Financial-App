const SuccessView = ({ submittedData, handleReset }) => {
  return (
    <div className="max-w-xl mx-auto border border-gray-200 rounded-xl p-6 bg-white shadow-md text-center">
      <h2 className="text-xl font-bold text-green-600 mb-3">
        ✅ Debt successfully added!
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Your <span className="font-semibold">{submittedData.category}</span> loan for{" "}
        <span className="font-semibold">{submittedData.label}</span> of{" "}
        <span className="font-semibold">${submittedData.current_balance}</span> with{" "}
        <span className="font-semibold">{submittedData.interest_rate}%</span> interest and a due date of{" "}
        <span className="font-semibold">{submittedData.due_date}</span> has been successfully added.
      </p>

      <button
        onClick={handleReset}
        className="w-full py-3 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition"
      >
        Add Another Debt
      </button>
    </div>
  );
};

export default SuccessView