const express = require("express");
const { importExcel, importPdf } = require("../controller/testController");
const upload = require("../middleware/multerMiddleware");
const router = express.Router();

router.post("/importExcel", upload.single("file"), importExcel);
router.post("/importPdf", upload.single("file"), importPdf);
// router.delete("/deleteEntry");

module.exports = router;
