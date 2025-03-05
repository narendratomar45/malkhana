const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const createExcise = require("../../controller/seizeVehicleEntry/exciseController");
const router = express.Router();
router
  .route("/exciseVehicle")
  .post(upload.fields([{ name: "document", maxCount: 1 }]), createExcise);
module.exports = router;
