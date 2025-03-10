const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createIpc,
  updateIpc,
  getIpcVehicle,
} = require("../../controller/seizeVehicleEntry/ipcController");
const router = express.Router();
router
  .route("/ipcVehicle")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createIpc)
  .get(getIpcVehicle);
router
  .route("/ipcVehicle/:id")
  .patch(upload.fields([{ name: "document", maxCount: 10 }]), updateIpc);
module.exports = router;
