const express = require("express");
const {
  importExcel,
  importPdf,
  getImportData,
} = require("../controller/importDataController");
const upload = require("../middleware/multerMiddleware");
const router = express.Router();

router
  .route("/importData")
  .post(upload.single("file"), importExcel)
  .get(getImportData);
router.post("/importPdf", upload.single("file"), importPdf);
// router.delete("/deleteEntry");

module.exports = router;
