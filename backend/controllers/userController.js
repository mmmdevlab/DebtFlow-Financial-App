const mongoose = require("mongoose");
const User = require("../models/User");
const Debt = require("../models/Debt");
const Payment = require("../models/Payment");

/* ------ GET ALL -------*/
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

/* ------ GET ONE -------*/
const getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ err: "Invalid user id" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ err: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

/* ------ DELETE -------*/
const deleteUser = async (req, res) => {
  try {
    const id = req.user._id;

    const debts = await Debt.find({ user_id: id });
    const debtIds = debts.map((debt) => debt._id);

    await Payment.deleteMany({ debt_id: { $in: debtIds } });
    await Debt.deleteMany({ user_id: id });

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ err: "User not found" });

    res
      .status(200)
      .json({ message: "User and related data deleted", user: deleted });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-hashedPassword");

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { getAllUsers, getUserById, deleteUser, getUserProfile };
