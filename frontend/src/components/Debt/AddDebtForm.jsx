import { useState } from "react";
import FormView from "./FormView";
import SuccessView from "./SuccessView";
import { createDebt, updateDebt } from "../../services/debtService";

const initialState = {
  label: "",
  category: "mortgage",
  principle_amount: 0,
  interest_rate: 0,
  current_balance: 0,
  start_date: "",
  due_date: "",
  frequency: "monthly",
  status: "active",
};

const AddDebtForm = ({ selectedData, isEditing, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    isEditing && selectedData ? selectedData : initialState,
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateDebt(selectedData?._id, formData);
      } else {
        await createDebt(formData);
        setSubmittedData(formData);
        setIsSubmitted(true);
      }
      onSubmit?.();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error connecting to server.");
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
      isEditing={isEditing}
      onCancel={onCancel}
    />
  );
};

export default AddDebtForm;
