import { useState, useContext } from "react";
import { DebtContext } from "../context/DebtContext";
import { deleteDebt } from "../services/debtService";
import DebtCard from "../components/Debt/DebtCard";
import PaymentHistoryLog from "../components/Payment/PaymentHistoryLog";
import { Divide } from "lucide-react";

const DEBT_FILTERS = ["all", "creditCard", "mortgage", "loan"];
const PAYMENT_FILTERS = ["all", "creditCard", "mortgage", "loan"];

const AllDebtsPage = () => {
  const { debts, loading, error, refetch } = useContext(DebtContext);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activePaymentFilter, setActivePaymentFilter] = useState("all");

  const handleDelete = async (id) => {
    try {
      await deleteDebt(id);
      await refetch();
    } catch (err) {
      console.error(err);
      alert("Error deleting debt");
    }
  };

  if (loading) return <p className="p-6 text-gray-400">Loading debts...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col p-6 max-w-3xl mx-auto gap-10">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Debts</h1>

        <div className="flex gap-2 flex-wrap">
          {DEBT_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full uppercase text-xs font-semibold tracking-widest transition ${
                activeFilter === filter
                  ? "bg-green-500 text-white"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>

        {debts.length === 0 ? (
          <p className="text-gray-400">No debts found.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {(activeFilter === "all"
              ? debts
              : debts.filter((d) => d.category === activeFilter)
            ).map((debt) => (
              <DebtCard
                key={debt._id}
                debt={debt}
                handleDelete={handleDelete}
                onUpdated={refetch}
              />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Payments</h1>

        <div className="flex gap-2 flex-wrap">
          {PAYMENT_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActivePaymentFilter(filter)}
              className={`px-5 py-2 rounded-full uppercase text-xs font-semibold tracking-widest transition ${
                activePaymentFilter === filter
                  ? "bg-green-500 text-white"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>
        <PaymentHistoryLog />
      </section>
    </div>
  );
};

export default AllDebtsPage;
