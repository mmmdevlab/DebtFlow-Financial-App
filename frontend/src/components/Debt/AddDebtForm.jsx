import { useState, useEffect } from "react";
import FormView from "./FormView";
import SuccessView from "./SuccessView";

const AddDebtForm = ({ selectedData, isEditing, onSubmit }) => {
  const initialState = {
    label: "",
    category: "mortgage",
    principle_amount: "",
    interest_rate: "",
    current_balance: "",
    start_date: "",
    due_date: "",
    frequency: "monthly",
    status: "active",
  };

  const [formData, setFormData] = useState(selectedData || initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (selectedData) {
      setFormData(selectedData);
    }
  }, [selectedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const url = isEditing
      ? `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/debts/${selectedData._id}`
      : `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/debts`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save debt");
      }

      if (isEditing) {
        onSubmit?.();
        return;
      }

      setSubmittedData(formData);
      setFormData(initialState);
      setIsSubmitted(true);

      onSubmit?.();

    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return isSubmitted ? (
    <SuccessView
      handleReset={() => setIsSubmitted(false)}
      submittedData={submittedData}
    />
  ) : (
    <FormView
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddDebtForm;