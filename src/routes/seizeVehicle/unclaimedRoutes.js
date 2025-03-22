const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createUnclaimedVehicle,
  getUnclaimedVehicle,
  updatedUnclaimedVehicle,
} = require("../../controller/seizeVehicleEntry/unclaimedVehicle");
const userAuth = require("../../middleware/authMiddleware");
const router = express.Router();
router.use(userAuth);
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
