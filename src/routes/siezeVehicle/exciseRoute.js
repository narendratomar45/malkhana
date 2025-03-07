const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createExcise,
  updateExcise,
} = require("../../controller/seizeVehicleEntry/exciseController");
const router = express.Router();
router
  .route("/exciseVehicle")
  .post(upload.fields([{ name: "document", maxCount: 1 }]), createExcise);
router
  .route("/exciseVehicle/:id")
  .patch(upload.fields([{ name: "document", maxCount: 1 }]), updateExcise);
module.exports = router;
