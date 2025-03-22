const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createSeizure,
  updateSeizureVehicle,
  getSeizureVehicle,
} = require("../../controller/seizeVehicleEntry/siezureController");
const userAuth = require("../../middleware/authMiddleware");
const router = express.Router();
router.use(userAuth);

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
