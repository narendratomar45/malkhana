const express = require("express");
const {
  register,
  login,
  deleteUser,
  logoutUser,
  updateUser,
} = require("../controller/authController");
const userAuth = require("../middleware/authMiddleware");
const upload = require("../middleware/multerMiddleware");

const router = express.Router();

// Separate routes for each functionality
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/logout", userAuth, logoutUser);

router
  .route("/user/:id")
  .delete(userAuth, deleteUser)
  .patch(userAuth, updateUser);

module.exports = router;
