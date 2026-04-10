import AddDebtForm from "../components/Debt/AddDebtForm";
import PaymentHistoryLog from "../components/Debt/PaymentHistoryLog";
import PaymentForm from "../components/Debt/PaymentForm";

// to add state for Paymentform only to show when a debt is selected from the list of debts.
const LogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2">
        <section className="flex flex-col gap-5">
          <AddDebtForm />
          <PaymentForm />
        </section>

        <section className="flex flex-col gap-5">
          <PaymentHistoryLog />
        </section>
      </div>
    </div>
  );
};
export default LogPage;
