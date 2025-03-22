const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createIpc,
  updateIpc,
  getIpcVehicle,
} = require("../../controller/seizeVehicleEntry/ipcController");
const userAuth = require("../../middleware/authMiddleware");
const router = express.Router();
router.use(userAuth);

router
  .route("/ipcVehicle")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createIpc)
  .get(getIpcVehicle);
router
  .route("/ipcVehicle/:id")
  .patch(upload.fields([{ name: "document", maxCount: 10 }]), updateIpc);
module.exports = router;
