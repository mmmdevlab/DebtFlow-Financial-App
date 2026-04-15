import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getAllPayments,
  createPayment,
  updatePayment as updatePaymentService,
  deletePayment as deletePaymentService,
} from "../services/paymentService";

import { DebtContext } from "./DebtContext";
import { UserContext } from "./UserContext";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const { refetch: refetchDebts } = useContext(DebtContext);
  const { user } = useContext(UserContext);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async () => {
    if (!user) {
      setPayments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPayments();
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const addPayment = async (payload) => {
    setError(null);
    try {
      await createPayment(payload);
      await fetchPayments();
      await refetchDebts();
    } catch (error) {
      console.error("Add Error:", error);
      setError("Error logging payment.");
    }
  };

  const updatePayment = async (id, payload) => {
    setError(null);
    try {
      await updatePaymentService(id, payload);
      await fetchPayments();
      await refetchDebts();
    } catch (error) {
      console.error("Update Error:", error);
      setError("Error updating payment.");
    }
  };

  const deletePayment = async (id) => {
    setError(null);
    try {
      await deletePaymentService(id);
      setPayments((prev) => prev.filter((p) => p._id !== id));
      await refetchDebts();
    } catch (error) {
      console.error("Delete Error:", error);
      setError("Error deleting payment.");
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        payments,
        loading,
        error,
        addPayment,
        updatePayment,
        deletePayment,
        refetchPayments: fetchPayments,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error("usePayments must be used inside a PaymentProvider");
  return context;
};
