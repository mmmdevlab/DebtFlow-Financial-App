const mongoose = require("mongoose");
const Debt = require("../models/Debt");
const Payment = require("../models/Payment");

/* ------ GET ALL -------*/
const getAllDebts = async (req, res) => {
  try {
    const debts = await Debt.find({ user_id: req.user._id });
    res.status(200).json(debts);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

/* ------ GET ONE -------*/
const getDebtById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ err: "Invalid debt id" });
    }
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ err: "Debt not found" });
    res.status(200).json(debt);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

/* ------ POST -------*/
const createDebt = async (req, res) => {
  try {
    const debt = await Debt.create({
      ...req.body,
      user_id: req.user._id,
    });
    res.status(201).json(debt);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

/* ------ PUT -------*/
const editDebt = async (req, res) => {
  try {
    const debt = await Debt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!debt) return res.status(404).json({ err: "Debt not found" });
    res.status(200).json(debt);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

/* ------ DELETE -------*/
const deleteDebt = async (req, res) => {
  try {
    const debt = await Debt.findByIdAndDelete(req.params.id);
    if (!debt) return res.status(404).json({ err: "Debt not found" });

    await Payment.deleteMany({ debt_id: req.params.id });

    res
      .status(200)
      .json({ message: "Debt and related payments deleted", debt });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { getAllDebts, getDebtById, createDebt, editDebt, deleteDebt };
