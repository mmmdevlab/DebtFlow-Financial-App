import { useState, useContext } from "react";
import { DebtContext } from "../context/DebtContext";
import UpcomingPaymentCard from "../components/Debt/UpcomingPaymentCard";
import PaymentForm from "../components/Debt/PaymentForm";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(amount);

const DashboardPage = () => {
  const { debts, loading, error } = useContext(DebtContext);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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

      {/* TOTAL */}
      <div className="border border-gray-100 rounded-xl p-5 bg-white">
        <p className="text-sm uppercase tracking-widest font-semibold">
          Total Debt
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-1">
          {formatCurrency(totalDebt)}
        </p>
      </div>

      {/* STATS */}
      <div className="flex gap-5">
        <div className="w-full rounded-xl p-5 bg-blue-200">
          <p className="text-sm uppercase tracking-widest font-semibold">
            Active Debts
          </p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{activeCount}</p>
        </div>

        <div className="w-full rounded-xl p-5 bg-red-200">
          <p className="text-sm uppercase tracking-widest font-semibold">
            Overdue
          </p>
          <p className="text-3xl font-bold text-red-500 mt-1">{overdueCount}</p>
        </div>
      </div>

      {/* UPCOMING */}
      <p className="text-gray-500 font-medium mt-2">
        Upcoming debt payments
      </p>

      <UpcomingPaymentCard 
        debts={debts} 
        onPay={(debt)=>{
          setSelectedDebt(debt)
          setShowPaymentForm(true)
        }

        }/>

      {showPaymentForm && (
        <PaymentForm
          debt={selectedDebt}
          onCancel={() => setShowPaymentForm(false)}
          onSuccess={async () => {
            setShowPaymentForm(false);
            const data = await getAllDebts();
            setDebts(data);
          }}
        />
      )}

      {/* CTA */}
      <button className="bg-green-500 text-white rounded-full px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-green-600 transition">
        + Add Debt
      </button>
    </div>
  );
};

export default DashboardPage;