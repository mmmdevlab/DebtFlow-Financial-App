import { useState, useContext } from "react";
import { DebtContext } from "../context/DebtContext";
import { deleteDebt } from "../services/debtService";
import DebtCard from "../components/Debt/DebtCard";
import AddDebtForm from "../components/Debt/AddDebtForm";
import PaymentHistoryLog from "../components/Debt/PaymentHistoryLog";

const FILTERS = ["all", "creditCard", "mortgage", "loan"];

const AllDebtsPage = () => {
  const { debts, loading, error, refetch } = useContext(DebtContext);

  const [selectedDebt, setSelectedDebt] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleEdit = (debt) => {
    setSelectedDebt(debt);
    setIsEditing(true);
  };

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
    <div className="p-6 max-w-2xl mx-auto">
      <section className="flex flex-col gap-10 m-2">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Debts</h1>

        {isEditing && (
          <AddDebtForm
            selectedData={selectedDebt}
            isEditing={true}
            onSubmit={async () => {
              setIsEditing(false);
              setSelectedDebt(null);
              await refetch();
            }}
          />
        )}

        {!isEditing && (
          <div>
            <div className="flex gap-2 flex-wrap mb-6">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full uppercase text-xs font-semibold tracking-widest transition
                  ${
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
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
      <section className="flex flex-col justify-center gap-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Payments</h1>
        <PaymentHistoryLog />
      </section>
    </div>
  );
};

export default AllDebtsPage;
