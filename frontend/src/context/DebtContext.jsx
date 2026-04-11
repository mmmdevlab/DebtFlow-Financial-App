import { createContext, useState, useEffect, useContext } from "react";
import { getAllDebts } from "../services/debtService";
import { UserContext } from "./UserContext";

const DebtContext = createContext();

export const DebtProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setDebts([]);
      setLoading(false);
      return;
    }

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
  }, [user]);

  const refetch = async () => {
    setLoading(true);
    try {
      const data = await getAllDebts();
      setDebts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DebtContext.Provider value={{ debts, loading, error, refetch }}>
      {children}
    </DebtContext.Provider>
  );
};

export { DebtContext };
