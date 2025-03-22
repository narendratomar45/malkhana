const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createOtherEntry,
  getOthersEntry,
} = require("../../controller/malkhanaEntry/otherEntryController");
const router = express.Router();
router
  .route("/otherEntry")
  .post(upload.fields([{ name: "document", maxCount: 1 }]), createOtherEntry)
  .get(getOthersEntry);
module.exports = router;
