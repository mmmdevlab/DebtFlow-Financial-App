import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setPayments([]);
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/payments`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = await res.json();
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch payments", err);
      setError("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const addPayment = async ({ debtId, amount, payment_date }) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          debt_id: debtId,
          amount: Number(amount),
          payment_date,
        }),
      });
      await fetchPayments();
    } catch (err) {
      console.error(err);
      setError("Error logging payment.");
    }
  };
  const updatePayment = async (paymentId, { amount, payment_date }) => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/payments/${paymentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: Number(amount), payment_date }),
        },
      );
      await fetchPayments();
    } catch (err) {
      console.error(err);
      setError("Error updating payment.");
    }
  };

  const deletePayment = async (paymentId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/payments/${paymentId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setPayments((prev) => prev.filter((p) => p._id !== paymentId));
    } catch (err) {
      console.error("Failed to delete payment", err);
      setError("Failed to delete payment.");
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
    throw new Error("usePayments must be used inside PaymentProvider");
  return context;
};
