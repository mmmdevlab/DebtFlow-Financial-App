const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    debt_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Debt",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Payment", paymentSchema);
