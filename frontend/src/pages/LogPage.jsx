import AddDebtForm from "../components/Debt/AddDebtForm";
import PaymentHistoryLog from "../components/Debt/PaymentHistoryLog";
import PaymentForm from "../components/Debt/PaymentForm";
// import { Navigate } from "react-router-dom";
// import NavBar from "../components/NavBar/NavBar";

// to add state for Paymentform only to show when a debt is selected from the list of debts.
const LogPage = () => {
  return (
    <>
      <div>
        <section>
          <h1>formside - container aka component </h1>
          <p>debt from</p>
          <p>payment form</p>
          <AddDebtForm className="gap-2" />
          <PaymentForm />
        </section>
        <section>
          <h1>payment history</h1>
          <PaymentHistoryLog />
        </section>
      </div>
    </>
  );
};
export default LogPage;
