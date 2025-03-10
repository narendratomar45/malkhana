const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createSeizure,
  updateSeizureVehicle,
  getSeizureVehicle,
} = require("../../controller/seizeVehicleEntry/siezureController");
const router = express.Router();
router
  .route("/seizureVehicle")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createSeizure)
  .get(getSeizureVehicle);
router
  .route("/seizureVehicle/:id")
  .patch(
    upload.fields([{ name: "document", maxCount: 10 }]),
    updateSeizureVehicle
  );
module.exports = router;
