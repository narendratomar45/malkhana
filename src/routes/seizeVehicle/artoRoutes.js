const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createArtoSeizure,
  updateArto,
  getArtoSeizure,
} = require("../../controller/seizeVehicleEntry/artoController");
const userAuth = require("../../middleware/authMiddleware");

const router = express.Router();
router.use(userAuth);
router
  .route("/arto")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createArtoSeizure)
  .get(getArtoSeizure);
router
  .route("/arto/:id")
  .patch(upload.fields([{ name: "document", maxCount: 10 }]), updateArto);
module.exports = router;
