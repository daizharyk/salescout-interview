// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

const mongoose = require("mongoose");

// Создаем модель напрямую, без схемы
const UserModel = mongoose.model("User", new Object());

async function manageUsers() {
  await mongoose.connect("mongodb://localhost:27017/test");

  await UserModel.create([
    { email: "unique@example.com" },
    { email: "duplicate@example.com" },
    { email: "duplicate@example.com" },
    { email: "anotherunique@example.com" },
  ]);

  const duplicates = await UserModel.aggregate([
    { $group: { _id: "$email", count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
    { $project: { _id: 0, email: "$_id" } },
  ]);


  return duplicates;
}

module.exports = { manageUsers };
