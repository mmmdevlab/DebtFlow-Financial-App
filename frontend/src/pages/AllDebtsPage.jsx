import { useState, useEffect } from "react";
import { getAllDebts } from "../services/debtService";
import DebtCard from "../components/Debt/DebtCard";

const FILTERS = ["all", "credit card", "mortgage", "loan", "other"];

const AllDebtsPage = () => {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all"); // 👈 new

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const data = await getAllDebts();
        setDebts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDebts();
  }, []);

  const filteredDebts =
    activeFilter === "all"
      ? debts
      : debts.filter((debt) => debt.category === activeFilter);

  const handleEdit = (debt) => {
    console.log("edit", debt);
  };

  const handleDelete = (id) => {
    console.log("delete", id);
  };

  if (loading) return <p className="p-6 text-gray-400">Loading debts...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Debt Entries</h1>

      <div className="flex gap-2 flex-wrap mb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`
              px-5 py-2 rounded-full uppercase text-xs font-bold tracking-widest transition-colors duration-150
              ${
                activeFilter === filter
                  ? "bg-green-500 text-white"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }
            `}
          >
            {filter === "all" ? "All" : filter}
          </button>
        ))}
      </div>

      {filteredDebts.length === 0 ? (
        <p className="text-gray-400">No debts found for this category.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredDebts.map((debt) => (
            <DebtCard
              key={debt._id}
              debt={debt}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDebtsPage;
