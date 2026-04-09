const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["mortgage", "creditCard", "loan"],
      required: true,
    },
    principle_amount: {
      type: Number,
      required: true,
    },
    interest_rate: {
      type: Number,
      required: true,
    },
    current_balance: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    frequency: {
      type: String,
      enum: ["monthly", "annually", "one-time payment"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "paidOff"],
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Debt", debtSchema);
