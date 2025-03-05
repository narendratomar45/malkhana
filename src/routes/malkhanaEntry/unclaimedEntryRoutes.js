const express = require("express");
const upload = require("../../middleware/multerMiddleware");
const {
  createUnclaimedEntry,
  getUnclaimedEntry,
} = require("../../controller/malkhanaEntry/unclaimedEntryController");
const router = express.Router();
router
  .route("/unclaimedEntry")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), createUnclaimedEntry)
  .get(getUnclaimedEntry);
