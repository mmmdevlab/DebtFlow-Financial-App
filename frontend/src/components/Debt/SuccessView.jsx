const SuccessView = ({ submittedData, handleReset }) => {
  const rows = [
    { label: "Category", value: submittedData.category },
    { label: "Label", value: submittedData.label },
    { label: "Balance", value: `$${submittedData.current_balance}` },
    { label: "Interest rate", value: `${submittedData.interest_rate}%` },
    { label: "Due date", value: submittedData.due_date },
  ];

  return (
    <div className="max-w-xl mx-auto border border-gray-200 rounded-xl p-6 bg-white shadow-md text-center">
      <div className="bg-green-50 border-b border-green-100 px-6 py-5 text-center">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 10l4 4 8-8"
            />
          </svg>
        </div>
        <p className="text-green-700 font-medium text-base">
          Debt successfully added
        </p>
      </div>

      <div className="px-6 py-2">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex justify-between items-center py-2.5 ${
              i < rows.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <span className="text-sm text-gray-400">{row.label}</span>
            <span className="text-sm font-medium text-gray-800">
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 pt-4">
        <button
          onClick={handleReset}
          className="w-full py-3 bg-green-500 text-white rounded-full font-bold text-sm hover:bg-green-600 transition"
        >
          Add Another Debt
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
