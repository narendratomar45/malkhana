const express = require("express");
const {
  createmvAct,
} = require("../../controller/seizeVehicleEntry/mvActController");
const upload = require("../../middleware/multerMiddleware");
const router = express.Router();
router
  .route("/mvAct")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createmvAct);
module.exports = router;
