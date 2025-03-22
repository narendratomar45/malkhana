const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createExcise,
  updateExcise,
  getExciseVehicle,
} = require("../../controller/seizeVehicleEntry/exciseController");
const { route } = require("../summonEntryRoutes");
const userAuth = require("../../middleware/authMiddleware");
const router = express.Router();
router.use(userAuth);
router
  .route("/exciseVehicle")
  .post(upload.fields([{ name: "document", maxCount: 1 }]), createExcise)
  .get(getExciseVehicle);
router
  .route("/exciseVehicle/:id")
  .patch(upload.fields([{ name: "document", maxCount: 1 }]), updateExcise);
module.exports = router;
