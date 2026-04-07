const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const usersController = require("./controllers/userController.js");
const debtsController = require("./controllers/debtController.js");
const paymentsController = require("./controllers/paymentController.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/users", usersController.getAllUsers);
app.post("/api/users", usersController.createUser);
app.get("/api/users/:id", usersController.getUserById);
app.delete("/api/users/:id", usersController.deleteUser);

app.get("/api/debts", debtsController.getAllDebts);
app.post("/api/debts", debtsController.createDebt);
app.put("/api/debts/:debtId", debtsController.editDebt);
app.delete("/api/debts/:debtId", debtsController.deleteDebt);

app.get("/api/payments", paymentsController.getAllPayments);
app.post("/api/payments", paymentsController.createPayment);
app.put("/api/payments/:paymentId", paymentsController.editPayment);
app.delete("/api/payments/:paymentId", paymentsController.deletePayment);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
