import { useState } from "react";
import FormView from "./FormView";
import SuccessView from "./SuccessView";

const AddDebtForm = () => {
  const [formData, setFormData] = useState({
    label: "",
    category: "mortgage",
    principle_amount: "",
    interest_rate: "",
    current_balance: "",
    start_date: "",
    due_date: "",
    frequency: "monthly",
    status: "active",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/debts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        setSubmittedData(formData)

        setFormData({
            label: "",
            category: "mortgage",
            principle_amount: "",
            interest_rate: "",
            current_balance: "",
            start_date: "",
            due_date: "",
            frequency: "monthly",
            status: "active",
          });

        setIsSubmitted(true);

      } else {
        alert("Error creating debt");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  const labelStyle =
    "text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1";
  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white transition";

  return isSubmitted ? (
  <SuccessView 
  handleReset={() => setIsSubmitted(false)}
  submittedData = {submittedData} />
) : (
  <FormView
    formData={formData}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
  />
);
};

export default AddDebtForm;
