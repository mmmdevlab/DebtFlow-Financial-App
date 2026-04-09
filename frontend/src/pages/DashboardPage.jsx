const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-5 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="border border-gray-200 rounded-xl p-5 bg-white">
        <p className="text-sm text-black uppercase tracking-widest font-semibold">
          Total Debt
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-1">$0.00</p>
      </div>
      <div className="flex flex-row gap-5">
        <div className="border border-gray-200 w-full rounded-xl p-5 bg-blue-200">
          <p className="text-sm text-black uppercase tracking-widest font-semibold">
            Active Debts
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
        </div>

        <div className="border border-gray-200 w-full rounded-xl p-5 bg-red-200">
          <p className="text-sm text-black uppercase tracking-widest font-semibold">
            Overdue
          </p>
          <p className="text-3xl font-bold text-red-500 mt-1">0</p>
        </div>
      </div>
      <p className="text-gray-500 font-medium mt-2">Upcoming debt tickets</p>

      <button className="bg-green-500 text-white rounded-full px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-green-600 transition-colors">
        + Add Debt
      </button>
    </div>
  );
};

export default DashboardPage;
