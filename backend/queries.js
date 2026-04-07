/*-------------------------------- Starter Code --------------------------------*/
const { faker } = require('@faker-js/faker');
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

/*-----------------------------------USERS-----------------------------------------------*/

/*----CREATE USER----*/

// const createUser = async () => {
//   const usersData = [
//     {
//       username: "JohnDoe",
//       hashedPassword: "123",
//       email: "JohnDoe@gmail.com",
//       accountType: "Personal",
//     },
//     {
//       username: "JaneDoe",
//       hashedPassword: "456",
//       email: "JaneDoe@gmail.com",
//       accountType: "Personal",
//     },
//   ];

//   await User.deleteMany({});
//   console.log("Cleared existing users.");

//   for (const userData of usersData) {
//     const user = await User.create(userData);
//     console.log("New user:", user);
//   }
// };

const createUser = async () => {
  await User.deleteMany({})
  console.log("Cleared existing users.")

  const users = []

  for (let i = 0; i < 10; i++) {
    users.push({
      username: faker.internet.username(),
      hashedPassword: faker.internet.password(),
      email: faker.internet.email(),
      accountType: faker.helpers.arrayElement(["Personal", "Business"])

    })
  }

  const createdUsers = await User.insertMany(users)
  console.log("Users created:", createdUsers)
}

const findAllUsers = async () => {
  const users = await User.find({});
  console.log("All users:", users);
};

const findUserById = async () => {
  const users = await User.find({})
  const randomUser = users[Math.floor(Math.random() * users.length)]
  const id = randomUser._id; //change the Id as required.
  const user = await User.findById(id);
  console.log("Found by Id:", user);
};

const findUserByUsername = async () => {
  const users = await User.find({})
  const randomUser = users[Math.floor(Math.random() * users.length)]

  const user = await User.findOne({ username: randomUser.username });
  console.log("Found by username:", user);
};

const deleteUser = async () => {

  const users = await User.find({})
  const randomUser = users[Math.floor(Math.random() * users.length)]
  
  const id = randomUser._id; 
  const debts = await Debt.find({ user_id: id });
  const debtIds = debts.map((debt) => debt._id);

  await Payment.deleteMany({ debt_id: { $in: debtIds } });
  console.log(`Deleted payments for ${debtIds.length} debts`);

  await Debt.deleteMany({ user_id: id });
  console.log("Deleted user's debts");

  const deleted = await User.findByIdAndDelete(id);
  console.log("Deleted user:", deleted);
};

/*-----------------------------------DEBT-----------------------------------------------*/

/*-------CREATE DEBT----- */

const createDebt = async () => {
  const userId = "69d36cc078ba3c41786b27d9"
  const user = await User.findById(userId)

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
    const debt = await Debt.create({...debtData, userId: user._id});
    console.log("New debt added to user:", debt);
  }
};

/*-------READ DEBT----- */

const getUserDebts = async () => {
  const userId = '69d36cc078ba3c41786b27d9'
  const debts = await Debt.find({ userId: userId})

  console.log("User Debts", debts)

}

/*-------EDIT / UPDATE DEBT----- */

const updateDebt = async () => {
  const debtId = '69d3ddf1e812711f37893c50';

  const debt = await Debt.findByIdAndUpdate(
    debtId, // id
    {
      label: "HDB_2",
      category: "mortgage_2",
      principle_amount: 350001,
      interest_rate: 2.51,
      current_balance: 350001,
      start_date: new Date("2026-01-01"),
      due_date: new Date("2046-01-01"),
      frequency: "monthly",
      status: "active",
    },   
    { new: true }, // { new: true }, // options
  );
  console.log("Updated Debt", debt);
};


/*-------DELETE DEBT----- */

const deleteDebt = async () => {

  const debtId = '69d3ddf1e812711f37893c50';

  const debt = await Debt.findByIdAndDelete(debtId);
  console.log("Deleted", debt);
};


/*----------------------------------------PAYMENT-----------------------------------------*/

/*-------CREATE PAYMENT----- */

const createPayment = async () => {
  const user = await User.findOne({ username: "JohnDoe" }); //Rama: Suggest we find by ID because it will be problematic if there are users with the exact same name. 
  const debt = await Debt.findOne({ label: "HDB" }); //Rama: Suggest we find by ID because it will be problematic if there are Debts with the exact same label. 

  if (!user || !debt) {
    console.log("User or debt not found, run createUser and createDebt first");
    return;
  }

  const paymentAmount = 500;

  const payment = await Payment.create({
    user_id: user._id,
    debt_id: debt._id,
    amount: paymentAmount,
    payment_date: new Date("2026-03-01"),
  });
  console.log("New payment created:", payment);

  const updatedDebt = await Debt.findByIdAndUpdate(
    debt._id,
    { $inc: { current_balance: -paymentAmount } },
    { new: true },
  );
  console.log("Updated debt balance:", updatedDebt.current_balance);

  if (updatedDebt.current_balance <= 0) {
    await Debt.findByIdAndUpdate(debt._id, { status: "paid_off" });
    console.log("Debt fully paid off!");
  }
};

/*-------READ PAYMENT----- */

const findPaymentId = async () => {
  const id = "69d3565e3e9ed960ddf9f798"; //change the Id as required.
  const payment = await Payment.findById(id)
    .populate("user_id", "username")
    .populate("debt_id", "label")
    .exec();
  console.log("Payment:", payment);
};

const findAllPayments = async () => {
  const payments = await Payment.find({})
    .populate("user_id", "username email") // replaces the ObjectId with user data
    .populate("debt_id", "label current_balance"); // replaces debt ObjectId with debt data
  console.log("All payments:", payments);
};

const findPaymentsByDebt = async () => {
  const debt = await Debt.findOne({ label: "HDB" });
  const payments = await Payment.find({ debt_id: debt._id });
  console.log(`Payments for ${debt.label}:`, payments);
};

/*-------EDIT UPDATE PAYMENT----- */
const editPayment = async () => {
  const id = "69d3565e3e9ed960ddf9f795"; //update the Id as required.

  const oldPayment = await Payment.findById(id);
  const newAmount = 750;
  const difference = newAmount - oldPayment.amount;

  const updated = await Payment.findByIdAndUpdate(
    id,
    { amount: newAmount },
    { new: true },
  );
  console.log("Updated payment:", updated);

  const updatedDebt = await Debt.findByIdAndUpdate(
    oldPayment.debt_id,
    { $inc: { current_balance: -difference } },
    { new: true },
  );
  console.log("Adjusted debt balance:", updatedDebt.current_balance);
};

/*-------DELETE PAYMENT----- */
const deletePayment = async () => {
  const id = "69d3565e3e9ed960ddf9f795"; // add the Id as required.

  const payment = await Payment.findById(id);

  if (!payment) {
    console.log("Payment not found");
    return;
  }

  await Payment.findByIdAndDelete(id);
  console.log("Payment deleted");

  const updatedDebt = await Debt.findByIdAndUpdate(
    payment.debt_id,
    { $inc: { current_balance: payment.amount } }, // add it back
    { new: true },
  );
  console.log("Debt balance restored to:", updatedDebt.current_balance);
};
/*----------------------------------------------------------------*/

const runQueries = async () => {
  console.log("Queries running.");
  // --- USERS ---
  // await createUser();
  // await findAllUsers();
  // await findUserById();
  // await findUserByUsername();
  await deleteUser();

  // --- DEBT ---
  // await createDebt();
  // await getUserDebts();
  // await updateDebt()
  // await deleteDebt()

  // --- PAYMENTS ---
  // await createPayment();
  // await findAllPayments();
  // await findPaymentById();
  // await findPaymentsByDebt();
  // await editPayment();
  // await deletePayment();
};
