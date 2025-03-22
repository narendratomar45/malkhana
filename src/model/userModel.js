const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    policeStation: {
      type: String,
      required: true,
    },
    mobile: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    designation: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    district: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
