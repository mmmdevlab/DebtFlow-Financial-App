import { useState } from "react";

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

      const res = await fetch("http://localhost:3000/api/debts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Debt created:", data);

      alert("Debt created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating debt");
    }
  };

  return (
  <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">

    <div className="flex items-center gap-4">
    <label className="w-40">Debt Name</label>
    <input
      type="text"
      name="label"
      placeholder="e.g. HDB Mortgage"
      value={formData.label}
      onChange={handleChange}
      className="flex-1 border p-2"
    />
    </div>

    <div className="flex items-center gap-4">
      <label className="w-40">Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="flex-1 border p-2"
      >
        <option value="mortgage">Mortgage</option>
        <option value="creditCard">Credit Card</option>
        <option value="loan">Loan</option>
      </select>
    </div>

    <div className="flex items-center gap-4">
      <label className="w-40">Principal Amount</label>
      <input
        type="number"
        name="principle_amount"
        placeholder="e.g. 350000"
        value={formData.principle_amount}
        onChange={handleChange}
        className="flex-1 border p-2"
      />
    </div>

    <div className="flex items-center gap-4">
      <label className="w-40">Interest Rate (%)</label>
      <input
        type="number"
        step="0.01"
        name="interest_rate"
        placeholder="e.g. 2.5"
        value={formData.interest_rate}
        onChange={handleChange}
        className="flex-1 border p-2"
      />
    </div>

    <div className="flex items-center gap-4">
      <label className="w-40">Current Balance</label>
      <input
        type="number"
        name="current_balance"
        placeholder="Usually same as principal"
        value={formData.current_balance}
        onChange={handleChange}
        className="flex-1 border p-2"
      />
    </div>

    <div className="flex items-center gap-4">
      <label className="w-40">Start Date</label>
      <input
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        className="flex-1 border p-2"
      />
    </div>

    <div className="flex items-center gap-4">
      <label className="w-40">Due Date</label>
      <input
        type="date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
        className="flex-1 border p-2"
      />
    </div>

    <div className="flex items-center gap-4">
      <label className="w-40">Frequency</label>
      <select
        name="frequency"
        value={formData.frequency}
        onChange={handleChange}
        className="flex-1 border p-2"
      >
        <option value="monthly">Monthly</option>
        <option value="annually">Annually</option>
      </select>
    </div>

    <div className="flex items-center gap-4">
      <label className="w-40">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="flex-1 border p-2"
      >
        <option value="active">Active</option>
        <option value="paidOff">Paid Off</option>
      </select>
    </div>

    <button className="bg-blue-500 text-white p-2 w-full mt-4">
      Add Debt
    </button>
  </form>
  );
};

export default AddDebtForm;