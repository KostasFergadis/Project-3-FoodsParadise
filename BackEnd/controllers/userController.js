import User from "../models/user.js";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../consts.js";
import jwt from "jsonwebtoken";

// Case-insensitive match so "A@x.com" and "a@x.com" are the same account
const findByEmail = (email) =>
  User.findOne({ email }).collation({ locale: "en", strength: 2 });

const getAllUsers = async (req, res, next) => {
  try {
    if (req.currentUser.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    // Get the user ID from the request token (assuming you have implemented authentication middleware)
    const userId = req.currentUser.id;

    // Fetch the user information from the database
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return the user data
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  // Only accept known fields: never trust a client-supplied role
  const { email, userName, password, confirmPassword } = req.body;
  try {
    const userExist = await findByEmail(email);
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    await User.create({ email, userName, password: hashed });
    return res.status(200).json({ message: "User successfully registered" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userAlreadyExist = await findByEmail(email);
    if (!userAlreadyExist) {
      return res
        .status(400)
        .json({ message: "User not found" });
    }
    const comparePasswords = await bcrypt.compare(
      password,
      userAlreadyExist.password
    );
    if (!comparePasswords) {
      return res.status(400).json({ message: "User not found" });
    }
    const payload = {
      id: userAlreadyExist.id,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    return res.status(200).json({
      message: `You have succesfully logged in! `,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  getAllUsers,
  getCurrentUser,
};
