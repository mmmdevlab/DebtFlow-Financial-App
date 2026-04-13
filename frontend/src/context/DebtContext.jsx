import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { getAllDebts } from "../services/debtService";
import { UserContext } from "./UserContext";

export const DebtContext = createContext();

export const DebtProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDebts = useCallback(async () => {
    if (!user) {
      setDebts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getAllDebts();
      setDebts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

  return (
    <DebtContext.Provider
      value={{ debts, loading, error, refetch: fetchDebts }}
    >
      {children}
    </DebtContext.Provider>
  );
};
