import { useContext } from "react";
import { usePayments } from "../../context/PaymentContext";
import { DebtContext } from "../../context/DebtContext";
import PaymentCard from "./PaymentCard";

const PaymentHistoryLog = () => {
  const { payments, loading, error } = usePayments();
  const { debts } = useContext(DebtContext);

  if (loading)
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
              ? payment.debt_id?._id
              : payment.debt_id;
          const debt = debts.find((d) => d._id === debtId);
          return (
            <PaymentCard key={payment._id} payment={payment} debt={debt} />
          );
        })
      )}
    </div>
  );
};

export default PaymentHistoryLog;
