import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DebtContext } from "../context/DebtContext";
import { usePayments } from "../context/PaymentContext";
import { getAllPayments } from "../components/Dashboard/PaymentList";
import PaymentList from "../components/Dashboard/PaymentList";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(amount);

const DashboardPage = () => {
  const { debts, loading, error } = useContext(DebtContext);
  const { payments, refetchPayments } = usePayments();
  const navigate = useNavigate();
  const allPayments = getAllPayments(debts, payments);

  const totalPayments = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0,
  );
  const totalDebt = debts.reduce((sum, d) => sum + d.current_balance, 0);
  const activeCount = debts.filter((d) => d.status === "active").length;
  const overdueCount = allPayments.filter((p) => p.isOverdue).length;

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-10 max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="w-full border border-gray-300 rounded-xl p-5 bg-white">
            <p className="text-sm uppercase tracking-widest font-semibold">
              Total Debt
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(totalDebt)}
            </p>
          </div>

          <div className="w-full border border-gray-300 rounded-xl p-5 bg-white">
            <p className="text-sm uppercase tracking-widest font-semibold">
              Total Payments
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(totalPayments)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="w-full rounded-xl p-5 bg-blue-50 border border-blue-300">
            <p className="text-sm uppercase tracking-widest font-semibold">
              Active Debts
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {activeCount}
            </p>
          </div>

          <div className="w-full rounded-xl p-5 bg-red-50 border border-red-200">
            <p className="text-sm uppercase tracking-widest font-semibold">
              Overdue
            </p>
            <p className="text-2xl font-bold text-red-500 mt-1">
              {overdueCount}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <PaymentList
          debts={debts}
          payments={payments}
          onSuccess={refetchPayments}
        />
      </section>

      <button
        onClick={() => navigate("/log-entries")}
        className="bg-green-500 text-white rounded-full px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-green-600 transition"
      >
        + Add Debt
      </button>
    </div>
  );
};

export default DashboardPage;
