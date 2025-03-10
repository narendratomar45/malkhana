const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createUnclaimedVehicle,
  getUnclaimedVehicle,
  updatedUnclaimedVehicle,
} = require("../../controller/seizeVehicleEntry/unclaimedVehicle");
const router = express.Router();
router
  .route("/unclaimedVehicle")
  .post(
    upload.fields([{ name: "document", maxCount: 10 }]),
    createUnclaimedVehicle
  )
  .get(getUnclaimedVehicle);
router
  .route("/unclaimedVehicle/:id")
  .patch(
    upload.fields([{ name: "document", maxCount: 10 }]),
    updatedUnclaimedVehicle
  );
module.exports = router;
