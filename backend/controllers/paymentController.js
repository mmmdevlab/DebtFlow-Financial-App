const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Debt = require("../models/Debt");

/* ------ GET ALL -------*/
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate(
      "user_id",
      "debt_id",
      "amount",
      "payment_date",
    );
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ------ GET ONE -------*/
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate(
      "user_id",
      "debt_id",
      "amount",
      "payment_date",
    );
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ------ POST -------*/
const createPayment = async (req, res) => {
  try {
    const { user_id, debt_id, amount, payment_date } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(user_id) ||
      !mongoose.Types.ObjectId.isValid(debt_id)
    ) {
      return res.status(400).json({ error: "Invalid user_id or debt_id" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ error: "Amount must be a positive number" });
    }

    const debt = await Debt.findById(debt_id);
    if (!debt) return res.status(404).json({ error: "Debt not found" });

    if (String(debt.user_id) !== String(user_id)) {
      return res
        .status(400)
        .json({ error: "Debt does not belong to this user" });
    }

    const payment = await Payment.create({
      user_id,
      debt_id,
      amount,
      payment_date,
    });

    debt.current_balance -= amount;
    debt.status = debt.current_balance <= 0 ? "paid_off" : "active";
    await debt.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ------ PUT -------*/
const editPayment = async (req, res) => {
  try {
    const oldPayment = await Payment.findById(req.params.id);
    if (!oldPayment)
      return res.status(404).json({ error: "Payment not found" });

    const { amount } = req.body;
    const difference = amount - oldPayment.amount;

    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      { amount, payment_date },
      { new: true },
    );

    await Debt.findByIdAndUpdate(
      oldPayment.debt_id,
      { $inc: { current_balance: -difference } },
      { new: true },
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ------ DELETE -------*/
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    await Payment.findByIdAndDelete(req.params.id);

    await Debt.findByIdAndUpdate(
      payment.debt_id,
      { $inc: { current_balance: payment.amount } },
      { new: true },
    );

    res.status(200).json({ message: "Payment deleted", payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  editPayment,
  deletePayment,
};
