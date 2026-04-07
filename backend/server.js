const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const usersController = require("./controllers/userController.js");
const debtsController = require("./controllers/debtController.js");
const paymentsController = require("./controllers/paymentController.js");

const app = express();
app.use(express.json());

// --- USER ROUTES ---
app.get("/api/users", usersController.getAllUsers);
app.get("/api/users/:id", usersController.getUserById);
app.post("/api/users", usersController.createUser);
app.delete("/api/users/:id", usersController.deleteUser);

// ----DEBT ROUTES ---
app.get("/api/debts", debtsController.getAllDebts);
app.get("/api/debts/:id", debtsController.getDebtById);
app.post("/api/debts", debtsController.createDebt);
app.put("/api/debts/:id", debtsController.editDebt);
app.delete("/api/debts/:id", debtsController.deleteDebt);

// --- PAYMENT ROUTES ---
app.get("/api/payments", paymentsController.getAllPayments);
app.get("/api/payments/:id", paymentsController.getPaymentById);
app.post("/api/payments", paymentsController.createPayment);
app.put("/api/payments/:id", paymentsController.editPayment);
app.delete("/api/payments/:id", paymentsController.deletePayment);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
