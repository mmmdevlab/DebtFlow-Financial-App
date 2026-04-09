// home
// big numbers at a glance
// upcoming list
// button
const DashboardPage = () => {
  return (
    <>
      <div className="flex flex-col gap-5 max-w-xl mx-auto border border-gray-200 rounded-xl p-6 bg-white shadow-md">
        <h1>Dashboard - aka home page</h1>
        <p> only see this when Logged in</p>
        <card>
          <card-header>
            <p>Big number debt overall at a glance</p>
          </card-header>
        </card>
        <card>
          <card-header>
            <p>Active Debts glance</p>
          </card-header>
        </card>
        <card>
          <card-header>
            <p>Overdue Debts glance</p>
          </card-header>
        </card>
        <p>up coming debt tickets here</p>
        <button>add debt</button>
      </div>
    </>
  );
};
export default DashboardPage;
