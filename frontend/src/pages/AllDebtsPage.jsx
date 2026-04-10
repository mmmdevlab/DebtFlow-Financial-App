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

  // const handleDelete = (id) => {
  //   console.log("delete", id);
  // };

  const handleDelete = async (id) => {
    console.log("delete", id);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/debts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete debt");
      }

      setDebts((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting debt");
    }
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
              px-5 py-2 rounded-full uppercase text-xs font-semibold tracking-widest transition-colors duration-150
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
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDebtsPage;
