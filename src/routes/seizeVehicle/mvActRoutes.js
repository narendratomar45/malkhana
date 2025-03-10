const express = require("express");
const {
  createmvAct,
  updateMvAct,
  getMvActSeizure,
} = require("../../controller/seizeVehicleEntry/mvActController");
const upload = require("../../middleware/multerMiddleware");
const router = express.Router();
router
  .route("/mvActSeizure")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createmvAct)
  .get(getMvActSeizure);
router
  .route("/mvActSeizure/:id")
  .patch(upload.fields([{ name: "document", maxCount: 10 }]), updateMvAct);
module.exports = router;
