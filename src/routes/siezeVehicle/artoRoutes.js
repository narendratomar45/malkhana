const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const createArtoSeizure = require("../../controller/seizeVehicleEntry/artoController");

const router = express.Router();
router
  .route("/arto")
  .post(upload.fields([{ name: "document", maxCount: 1 }]), createArtoSeizure);
module.exports = router;
