const express = require("express");
const {
  createmvAct,
  updateMvAct,
} = require("../../controller/seizeVehicleEntry/mvActController");
const upload = require("../../middleware/multerMiddleware");
const router = express.Router();
router
  .route("/mvAct")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createmvAct);
router
  .route("/mvAct/:id")
  .patch(upload.fields([{ name: "document", maxCount: 10 }]), updateMvAct);
module.exports = router;
