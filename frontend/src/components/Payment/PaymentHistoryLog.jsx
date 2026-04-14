import { useContext } from "react";
import { usePayments } from "../../context/PaymentContext";
import { DebtContext } from "../../context/DebtContext";
import PaymentCard from "./PaymentCard";

const PaymentHistoryLog = () => {
  const { payments, loading: paymentsLoading, error } = usePayments();
  const { debts, loading: debtsLoading } = useContext(DebtContext);

  if (paymentsLoading || debtsLoading)
    return <p className="text-gray-400 text-sm">Loading payments...</p>;
  if (error) return <p className="text-red-400 text-sm">{error}</p>;

  return (
    <div className="flex flex-col gap-2">
      {payments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No payment records yet.
        </p>
      ) : (
        payments.map((payment) => {
          const debtId =
            typeof payment.debt_id === "object"
              ? payment.debt_id?._id?.toString()
              : payment.debt_id;
          const debt = debts.find(
            (d) => d._id?.toString() === debtId?.toString(),
          );
          console.log("payment.debt_id:", payment.debt_id);
          console.log("resolved debtId:", debtId);
          console.log(
            "debts available:",
            debts.map((d) => d._id?.toString()),
          );
          console.log("matched debt:", debt);

          return (
            <PaymentCard key={payment._id} payment={payment} debt={debt} />
          );
        })
      )}
    </div>
  );
};

export default PaymentHistoryLog;
