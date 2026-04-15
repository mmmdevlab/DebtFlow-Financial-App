import { useContext } from "react";
import { usePayments } from "../../context/PaymentContext";
import { DebtContext } from "../../context/DebtContext";
import PaymentCard from "./PaymentCard";

const PaymentHistoryLog = ({ filter }) => {
  const { payments, loading: paymentsLoading, error } = usePayments();
  const { debts, loading: debtsLoading } = useContext(DebtContext);

  if (paymentsLoading || debtsLoading)
    return <p className="text-gray-400 text-sm">Loading payments...</p>;
  if (error) return <p className="text-red-400 text-sm">{error}</p>;

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;

    const debtId =
      typeof payment.debt_id === "object"
        ? payment.debt_id?._id?.toString()
        : payment.debt_id;

    const associatedDebt = debts.find(
      (d) => d._id?.toString() === debtId?.toString(),
    );

    return associatedDebt?.category === filter;
  });

  return (
    <div className="flex flex-col gap-2">
      {filteredPayments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No {filter !== "all" ? filter : ""} payment records found.
        </p>
      ) : (
        filteredPayments.map((payment) => {
          const debtId =
            typeof payment.debt_id === "object"
              ? payment.debt_id?._id?.toString()
              : payment.debt_id;
          const debt = debts.find(
            (d) => d._id?.toString() === debtId?.toString(),
          );

          return (
            <PaymentCard key={payment._id} payment={payment} debt={debt} />
          );
        })
      )}
    </div>
  );
};

export default PaymentHistoryLog;
