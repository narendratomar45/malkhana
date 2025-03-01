const express = require("express");
const { register, login, deleteUser } = require("../controller/authController");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.delete("/delete/:id", deleteUser);
module.exports = router;
