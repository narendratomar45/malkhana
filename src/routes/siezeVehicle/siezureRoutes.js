const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createSiezure,
} = require("../../controller/seizeVehicleEntry/siezureController");
const router = express.Router();
router
  .route("/siezure")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createSiezure);
module.exports = router;
