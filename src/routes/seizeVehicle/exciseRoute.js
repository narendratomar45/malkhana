const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createExcise,
  updateExcise,
  getExciseVehicle,
} = require("../../controller/seizeVehicleEntry/exciseController");
const router = express.Router();
router
  .route("/exciseVehicle")
  .post(upload.fields([{ name: "document", maxCount: 1 }]), createExcise)
  .get(getExciseVehicle);
router
  .route("/exciseVehicle/:id")
  .patch(upload.fields([{ name: "document", maxCount: 1 }]), updateExcise);
module.exports = router;
