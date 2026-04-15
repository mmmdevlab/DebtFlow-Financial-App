require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Debt = require("./models/Debt");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await User.deleteMany({});
    await Debt.deleteMany({});
    console.log("Cleared existing data.");

    const hashedPassword = bcrypt.hashSync("password123", 12);

    const testUser = await User.create({
      username: "testuser",
      email: "testuser@email.com",
      hashedPassword: hashedPassword,
      accountType: "Personal",
    });
    console.log("Created test user.");

    await Debt.create([
      {
        user_id: testUser._id,
        label: "Home Mortgage",
        category: "mortgage",
        principle_amount: 350000,
        interest_rate: 3.5,
        current_balance: 320000,
        start_date: "2024-01-01",
        due_date: "2054-01-01",
        frequency: "monthly",
        status: "active",
      },
      {
        user_id: testUser._id,
        label: "Visa Credit Card",
        category: "creditCard",
        principle_amount: 5000,
        interest_rate: 19.99,
        current_balance: 1200,
        start_date: "2023-06-15",
        due_date: "2026-06-15",
        frequency: "one-time payment",
        status: "active",
      },
    ]);
    console.log("Created sample debts.");

    console.log("Seeding completed successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();
