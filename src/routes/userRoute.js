const express = require("express");
const {
  register,
  login,
  deleteUser,
  logoutUser,
  updateUser,
} = require("../controller/authController");
const userAuth = require("../middleware/authMiddleware");
const router = express.Router();
router
  .post("/register", register)
  .post("/login", login)
  .delete("/delete/:id", userAuth, deleteUser)
  .post("/logout", userAuth, logoutUser)
  .patch("/update/:id", userAuth, updateUser);
module.exports = router;
