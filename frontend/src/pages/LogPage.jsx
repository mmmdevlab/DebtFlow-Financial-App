import AddDebtForm from "../components/Debt/AddDebtForm";
// import { Navigate } from "react-router-dom";
// import NavBar from "../components/NavBar/NavBar";
// form to pay debts
// list of all payments for selected debt

// to add state for Paymentform only to show when a debt is selected from the list of debts.
const LogPage = () => {
  return (
    <>
      <div>
        <section>
          <h1>formside - container aka component </h1>
          <p>debt from</p>
          <p>payment form</p>
          <AddDebtForm />
          {/* <PaymentForm /> */}
        </section>
        <section>
          <h1>payment history</h1>
          {/* <PaymentLog /> */}
        </section>
      </div>
    </>
  );
};
export default LogPage;
