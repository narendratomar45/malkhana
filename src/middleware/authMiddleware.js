const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const userAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, "4@5#8@3#Narendra");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Invalid token" });
  }
};

module.exports = userAuth;
