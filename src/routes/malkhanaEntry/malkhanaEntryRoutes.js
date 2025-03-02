const express = require("express");
const {
  createMalkhanaEntry,
} = require("../../controller/malkhanaEntry/malkhanaEntryController");
const upload = require("../../middleware/multerMiddleware");
const router = express.Router();
router.post(
  "/createMalkhanaEntry",
  upload.fields([{ name: avatar, maxCount: 1 }]),
  createMalkhanaEntry
);
module.exports = router;
