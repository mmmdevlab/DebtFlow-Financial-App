import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DebtContext } from "../context/DebtContext";
import { usePayments } from "../context/PaymentContext";
import UpcomingPaymentCard from "../components/Debt/UpcomingPaymentCard";
import PaymentForm from "../components/Debt/PaymentForm";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(amount);

const DashboardPage = () => {
  const { debts, loading, error } = useContext(DebtContext);
  const { payments, refetchPayments } = usePayments();
  const navigate = useNavigate();

  const [selectedDebt, setSelectedDebt] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const totalPayments = payments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0,
  );
  const totalDebt = debts.reduce((sum, d) => sum + d.current_balance, 0);
  const activeCount = debts.filter((d) => d.status === "active").length;
  const overdueCount = debts.filter(
    (d) => new Date(d.due_date) < new Date() && d.status !== "paidOff",
  ).length;

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-5 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>

      <div className="border border-gray-100 rounded-xl p-5 bg-white">
        <p className="text-sm uppercase tracking-widest font-semibold">
          Total Debt
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {formatCurrency(totalDebt)}
        </p>
      </div>

      <div className="border border-gray-100 rounded-xl p-5 bg-white">
        <p className="text-sm uppercase tracking-widest font-semibold">
          Total Payments
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {formatCurrency(totalPayments)}
        </p>
      </div>

      <div className="flex gap-5">
        <div className="w-full rounded-xl p-5 bg-blue-200">
          <p className="text-sm uppercase tracking-widest font-semibold">
            Active Debts
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{activeCount}</p>
        </div>

        <div className="w-full rounded-xl p-5 bg-red-200">
          <p className="text-sm uppercase tracking-widest font-semibold">
            Overdue
          </p>
          <p className="text-2xl font-bold text-red-500 mt-1">{overdueCount}</p>
        </div>
      </div>
      <p> Overdue </p>
      <p className="text-gray-500 font-medium mt-2">Upcoming debt payments</p>

      <UpcomingPaymentCard
        debts={debts}
        payments = {payments}
        onPay={(debt) => {
          setSelectedDebt(debt);
          setShowPaymentForm(true);
        }}
      />

      {showPaymentForm && selectedDebt && (
        <PaymentForm
          debt={selectedDebt}
          onClose={() => {
            setShowPaymentForm(false);
            setSelectedDebt(null);
          }}
          onSuccess={refetchPayments}
        />
      )}
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
