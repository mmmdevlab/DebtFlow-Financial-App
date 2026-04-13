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
    <div className="flex flex-col gap-5 max-w-xl mx-auto border border-gray-200 rounded-xl p-6 bg-white shadow-md">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          All Payment History
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {payments.length} record{payments.length !== 1 ? "s" : ""}
        </p>
      </div>

      {payments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          No payment records yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {payments.map((payment) => {
            const debt = debts.find((d) => d._id === payment.debt_id);
            return (
              <PaymentCard key={payment._id} payment={payment} debt={debt} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryLog;
