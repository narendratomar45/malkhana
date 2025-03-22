const express = require("express");
const {
  createKurkiEntry,
  getAllKurkiEntry,
  updateKurkiEntry,
} = require("../../controller/malkhanaEntry/kurkiController");
const upload = require("../../middleware/multerMiddleware");
const userAuth = require("../../middleware/authMiddleware");
const router = express.Router();
router.use(userAuth);
router
  .route("/kurkiEntry")
  .post(upload.fields([{ name: "document", maxCount: 1 }]), createKurkiEntry)
  .get(getAllKurkiEntry)
  .patch(updateKurkiEntry);
module.exports = router;
