const express = require("express");
const {
  createMalkhanaEntry,
  getAllMalkhanaEntry,
  updateMalkhanaEntry,
} = require("../../controller/malkhanaEntry/malkhanaEntryController");
const upload = require("../../middleware/multerMiddleware");
const router = express.Router();
router
  .route("/malkhanaEntry")
  .post(upload.fields([{ name: "avatar", maxCount: 10 }]), createMalkhanaEntry)
  .get(getAllMalkhanaEntry);
router
  .route("/malkhanaEntry/:id")
  .patch(
    upload.fields([{ name: "avatar", maxCount: 10 }]),
    updateMalkhanaEntry
  );
module.exports = router;
