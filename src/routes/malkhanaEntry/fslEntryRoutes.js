const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createFslEntry,
  getFslEntry,
} = require("../../controller/malkhanaEntry/fslEntryController");
const router = express.Router();
router
  .route("/fslEntry")
  .post(upload.fields([{ name: "avatar", maxCount: 10 }]), createFslEntry)
  .get(getFslEntry);
module.exports = router;
