import connectToDb from "./db.js";
import { DB_CONNECTION_STRING } from "../consts.js";
import mongoose from "mongoose";
import Food from "../models/food.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import foodData from "./foodsData.js";

const hashPassword = async (plainTxtPassword) => {
  const hashedPassword = await bcrypt.hash(plainTxtPassword, 10);
  return hashedPassword;
};

const adminPassword = process.env.SEED_ADMIN_PASSWORD;
const userPassword = process.env.SEED_USER_PASSWORD;
if (!adminPassword || !userPassword) {
  console.error("Set SEED_ADMIN_PASSWORD and SEED_USER_PASSWORD in .env first.");
  process.exit(1);
}

// Seeding drops the whole database, so only allow local ones by default.
const isLocal = /^mongodb:\/\/(localhost|127\.0\.0\.1)/.test(DB_CONNECTION_STRING);
if (!isLocal && process.env.ALLOW_REMOTE_SEED !== "true") {
  console.error(
    "Refusing to wipe a non-local database. Set ALLOW_REMOTE_SEED=true to override."
  );
  process.exit(1);
}

const seedingData = {
  users: [
    {
      email: "admin@gmail.com",
      userName: "Administrator",
      password: await hashPassword(adminPassword),
      role: "admin",
    },
    {
      email: "user@gmail.com",
      userName: "User",
      password: await hashPassword(userPassword),
      role: "user",
    },
  ],
};

const seedDb = async () => {
  await connectToDb();
  await mongoose.connection.db.dropDatabase();
  console.log("Database connected!");
  await Food.create(foodData.foods);
  await User.create(seedingData.users);
  console.log(`Created ${seedingData.users.length} users`);
  console.log(`Created ${foodData.foods.length} foods`);
  await mongoose.disconnect();
};
seedDb();
