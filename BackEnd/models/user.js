import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  list: {
    type: [],
    ref: "Food",
    default: [],
  },
});

// One account per email, regardless of letter case
userSchema.index(
  { email: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

export default mongoose.model("User", userSchema);
