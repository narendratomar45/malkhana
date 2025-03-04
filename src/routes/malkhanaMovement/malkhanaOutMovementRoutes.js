const express = require("express");
const createMalkhnaMovement = require("../../controller/malkhanaMovementController");
const router = express.Router();
router.route("/malkhanaOutMovement").post(createMalkhnaMovement);
module.exports = router;
