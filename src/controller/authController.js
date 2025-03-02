const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, mobile, policeStation, designation } =
      req.body;
    if (
      !username ||
      !email ||
      !password ||
      !mobile ||
      !policeStation ||
      !designation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "You have already account " });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      policeStation,
      designation,
      mobile,
    });
    return res
      .status(201)
      .json({ success: true, message: "User created Successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }
    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.designation },
      "4@5#8@3#Narendra",
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side access to the cookie
      secure: false, // Set to 'true' if using HTTPS
      sameSite: "Lax", // Prevents CSRF attacks
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return res
      .status(200)
      .json({ success: true, message: "Login Successful", token, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { username, email, password, mobile, policeStation, designation } =
      req.user;
    const { _id } = req.user;
    console.log("USERIDINUPDATECONTROLLER", _id);

    if (!_id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized request" });
    }
    const allowableFields = [
      "username",
      "password",
      "mobile",
      "policeStation",
      "designation",
    ];
    let updateds = {};
    Object.keys(req.body).forEach((key) => {
      if (allowableFields.includes(key) && req.body[key]) {
        updateds[key] = req.body[key];
      }
    });
    if (Object.keys(updateds).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No valid fields to update" });
    }
    if (updateds.password) {
      const salt = await bcrypt.genSalt(10);
      updateds.password = await bcrypt.hash(updateds.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(_id, updateds, {
      new: true,
    });
    return res.status(201).json({
      success: true,
      message: "User is updated Successfully",
      updatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Deleted Successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Loggedout successfully" });
  } catch (error) {}
};
module.exports = { register, login, deleteUser, logoutUser, updateUser };
