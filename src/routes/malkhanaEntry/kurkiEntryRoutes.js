const express = require("express");
const {
  createKurkiEntry,
  getAllKurkiEntry,
  updateKurkiEntry,
} = require("../../controller/malkhanaEntry/kurkiController");
const upload = require("../../middleware/multerMiddleware");
const router = express.Router();
router
  .route("/kurkiEntry")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), createKurkiEntry)
  .get(getAllKurkiEntry)
  .patch(updateKurkiEntry);
module.exports = router;
