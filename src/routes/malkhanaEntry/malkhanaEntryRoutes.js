const express = require("express");
const {
  createMalkhanaEntry,
  getAllMalkhanaEntry,
  updateMalkhanaEntry,
} = require("../../controller/malkhanaEntry/malkhanaEntryController");
const upload = require("../../middleware/multerMiddleware");
const router = express.Router();
router.post(
  "/createMalkhanaEntry",
  upload.fields([{ name: "avatar", maxCount: 10 }]),
  createMalkhanaEntry
);
router.get("/getMalkhanaEntry", getAllMalkhanaEntry);
router.patch("/updateMalkhanEntry/:id", updateMalkhanaEntry);
module.exports = router;
