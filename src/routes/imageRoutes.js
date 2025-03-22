const express = require("express");
const { uploadImage, relatedImage } = require("../controller/imageController");
const upload = require("../middleware/multerMiddleware");
const router = express.Router();
router
  .route("/uploadImage")
  .post(upload.fields([{ name: "document", maxCount: 10 }]), uploadImage);
router.route("/relatedImage").post(upload.single("document"), relatedImage);
module.exports = router;
