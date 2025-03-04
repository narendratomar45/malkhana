const express = require("express");
const sendSMS = require("../controller/smsController");
const router = express.Router();
router.post("/sendSms", sendSMS);
module.exports = router;
