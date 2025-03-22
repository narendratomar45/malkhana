const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createFslEntry,
  getFslEntry,
} = require("../../controller/malkhanaEntry/fslEntryController");
const userAuth = require("../../middleware/authMiddleware");
const router = express.Router();
router.use(userAuth);
router
  .route("/fslEntry")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), createFslEntry)
  .get(getFslEntry);
module.exports = router;
