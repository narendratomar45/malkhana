const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    policeStation: {
      type: String,
      required: true,
    },
    designation: { type: String, required: true },
    mobile: { type: String },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
