import { useState, useEffect } from "react";
import { getAllDebts } from "../services/debtService";
import DebtCard from "../components/Debt/DebtCard";

const AllDebtsPage = () => {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleEdit = (debt) => {
    console.log("edit", debt); // MATS to add later
  };

  const handleDelete = (id) => {
    console.log("delete", id); // MATS to add later
  };

  if (loading) return <p className="p-6 text-gray-400">Loading debts...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1>Filter to add on here next</h1>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Debts</h1>

      {debts.length === 0 ? (
        <p className="text-gray-400">No debts found. Add one to get started.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {debts.map((debt) => (
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
