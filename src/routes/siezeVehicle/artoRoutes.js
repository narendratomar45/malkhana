const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createArtoSeizure,
  updateArto,
} = require("../../controller/seizeVehicleEntry/artoController");

const router = express.Router();
router
  .route("/arto")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createArtoSeizure);
router
  .route("/arto/:id")
  .patch(upload.fields([{ name: "document", maxCount: 10 }]), updateArto);
module.exports = router;
