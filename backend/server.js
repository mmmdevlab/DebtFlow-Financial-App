const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const authRouter = require("./controllers/authController.js");
// const testJwtRouter = require("./controllers/test-jwt.js");
const verifyToken = require("./middleware/verify-token.js");

const usersController = require("./controllers/userController.js");
const debtsController = require("./controllers/debtController.js");
const paymentsController = require("./controllers/paymentController.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "DebtFlow API is running" });
});

app.use("/auth", authRouter);
// app.use("/test-jwt", testJwtRouter);

app.get("/api/users/profile", verifyToken, usersController.getUserProfile);
app.get("/api/users", verifyToken, usersController.getAllUsers);
app.get("/api/users/:id", verifyToken, usersController.getUserById);
app.delete("/api/users/:id", verifyToken, usersController.deleteUser);

app.get("/api/debts", verifyToken, debtsController.getAllDebts);
app.post("/api/debts", verifyToken, debtsController.createDebt);
app.get("/api/debts/:id", verifyToken, debtsController.getDebtById);
app.put("/api/debts/:id", verifyToken, debtsController.editDebt);
app.delete("/api/debts/:id", verifyToken, debtsController.deleteDebt);

app.get("/api/payments", verifyToken, paymentsController.getAllPayments);
app.post("/api/payments", verifyToken, paymentsController.createPayment);
app.put("/api/payments/:id", verifyToken, paymentsController.editPayment);
app.delete("/api/payments/:id", verifyToken, paymentsController.deletePayment);

app.use((req, res) => {
  res.status(404).json({ err: "Route not found" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection err:", err.message);
    process.exit(1);
  });
