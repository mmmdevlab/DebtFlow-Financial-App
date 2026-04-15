const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Debt = require("../models/Debt");

/* ------ GET ALL -------*/
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user_id: req.user._id })
      .populate("user_id", "username email")
      .populate("debt_id", "label");
    res.status(200).json(payments);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

/* ------ GET ONE -------*/
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("user_id", "username email")
      .populate("debt_id", "label");
    if (!payment) return res.status(404).json({ err: "Payment not found" });
    res.status(200).json(payment);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

/* ------ POST -------*/
const createPayment = async (req, res) => {
  try {
    const { debt_id, amount, payment_date } = req.body;
    const user_id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(debt_id)) {
      return res.status(400).json({ err: "Invalid debt_id" });
    }

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ err: "Amount must be a positive number" });
    }

    const debt = await Debt.findById(debt_id);
    if (!debt) return res.status(404).json({ err: "Debt not found" });

    if (String(debt.user_id) !== String(user_id)) {
      return res.status(403).json({ err: "Unauthorized" });
    }

    const payment = await Payment.create({
      user_id,
      debt_id,
      amount,
      payment_date,
    });

    debt.current_balance -= amount;
    debt.status = debt.current_balance <= 0 ? "paidOff" : "active";
    await debt.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

/* ------ PUT -------*/
const editPayment = async (req, res) => {
  try {
    const oldPayment = await Payment.findById(req.params.id);
    if (!oldPayment) return res.status(404).json({ err: "Payment not found" });

    const { amount, payment_date } = req.body;
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
    res.status(400).json({ err: err.message });
  }
};

/* ------ DELETE -------*/
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ err: "Payment not found" });

    await Payment.findByIdAndDelete(req.params.id);

    await Debt.findByIdAndUpdate(
      payment.debt_id,
      { $inc: { current_balance: payment.amount } },
      { new: true },
    );

    res.status(200).json({ message: "Payment deleted", payment });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  editPayment,
  deletePayment,
};
