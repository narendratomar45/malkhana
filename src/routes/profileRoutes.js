const express = require("express");
const { profile } = require("../controller/profileController");
const userAuth = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/profile").get(userAuth, profile);
module.exports = router;
