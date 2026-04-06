/*-------------------------------- Starter Code --------------------------------*/

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const User = require("./models/User");
const Debt = require("./models/Debt");
const Payment = require("./models/Payment");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await runQueries();
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

connect();
/*-------------------------------- Query Functions --------------------------------*/

/*----USER CREATE----*/

const createUser = async () => {
  const usersData = [
    {
      username: "JohnDoe",
      hashedPassword: "123",
      email: "JohnDoe@gmail.com",
      accountType: "Personal",
    },
    {
      username: "JaneDoe",
      hashedPassword: "456",
      email: "JaneDoe@gmail.com",
      accountType: "Personal",
    },
  ];

  await User.deleteMany({});
  console.log("Cleared existing users.");

  for (const userData of usersData) {
    const user = await User.create(userData);
    console.log("New user:", user);
  }
};

/*----USER READ----*/

/*----USER DELETE----*/

/*----------------------------------------------------------------------------------*/

/*-------CREATE DEBT----- */

const createDebt = async () => {
  const debtsData = [
    {
      label: "HDB",
      category: "mortgage",
      principle_amount: 350000,
      interest_rate: 2.5,
      current_balance: 350000,
      start_date: new Date("2026-01-01"),
      due_date: new Date("2046-01-01"),
      frequency: "monthly",
      status: "active",
    },
  ];
  await Debt.deleteMany({});
  console.log("Cleared existing debts.");

  for (const debtData of debtsData) {
    const debt = await Debt.create(debtData);
    console.log("New debt:", debt);
  }
};

/*-------READ DEBT----- */

/*-------EDIT DEBT----- */

/*-------DELETE DEBT----- */

/*----------------------------------------------------------------------------------*/

/*-------CREATE PAYMENT----- */

const createPayment = async () => {
  const paymentsData = [
    {
      amount: 500,
      payment_date: new Date("2026-02-01"),
    },
  ];

  await Payment.deleteMany({});
  console.log("Cleared existing payments.");

  for (const paymentData of paymentsData) {
    const payment = await Payment.create(paymentData);
    console.log("New payment:", payment);
  }
};

/*-------READ PAYMENT----- */

const findPayment = async () => {
  const id = "69d36cc178ba3c41786b27dc" //change the Id as required.
  const payment = await Payment.findById(id).exec() 
  console.log("Payment:", payment);
}

/*-------EDIT PAYMENT----- */


/*-------DELETE PAYMENT----- */

const runQueries = async () => {
  console.log("Queries running.");
  // await createUser();
  // await createDebt();
  // await createPayment();
  await findPayment()

};
