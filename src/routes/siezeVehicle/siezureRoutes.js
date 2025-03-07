const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createSiezure,
  updateSeizureVehicle,
} = require("../../controller/seizeVehicleEntry/siezureController");
const router = express.Router();
router
  .route("/siezure")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createSiezure);
router
  .route("/siezure/:id")
  .patch(
    upload.fields([{ name: "document", maxCount: 10 }]),
    updateSeizureVehicle
  );
module.exports = router;
