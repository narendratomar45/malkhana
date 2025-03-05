const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const createIpc = require("../../controller/seizeVehicleEntry/ipcController");
const router = express.Router();
router
  .route("/ipc")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createIpc);
module.exports = router;
