const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const uploadOnCloudinary = require("../utilities/cloudinary");
const register = async (req, res) => {
  try {
    const {
      username,
      policeStation,
      mobile,
      email,
      designation,
      role,
      password,
      confirmPassword,
      district,
    } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !policeStation ||
      !designation ||
      !role ||
      !district
    ) {
      return res.status(400).json({ message: "All fields are requireds" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
    console.log("REQ FILE:", req.file);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "You have already account " });
    }
    const localPath = path.resolve(req.file.path);
    console.log("LP", localPath);

    if (!localPath) {
      return res.status(400).json({ message: "Avatar file is required" });
    }
    const documentFile = await uploadOnCloudinary(localPath);
    console.log("DF", documentFile);

    if (!documentFile || !documentFile.url) {
      return res.status(400).json({ message: "Upload Avatar Failed" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      policeStation,
      mobile,
      email,
      designation,
      role,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      district,
      avatar: documentFile.url,
    });

    return res
      .status(201)
      .json({ success: true, message: "User created Successfully", user });
  } catch (error) {
    console.log("ERROR", error);

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
    const token = jwt.sign({ userId: user._id }, "4@5#8@3#Narendra", {
      expiresIn: "7d",
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
    const {
      username,
      policeStation,
      mobile,
      email,
      designation,
      role,
      password,
    } = req.user;
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
