const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createIpc,
  updateIpc,
} = require("../../controller/seizeVehicleEntry/ipcController");
const router = express.Router();
router
  .route("/ipc")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createIpc);
router
  .route("/ipc/:id")
  .patch(upload.fields([{ name: "document", maxCount: 10 }]), updateIpc);
module.exports = router;
