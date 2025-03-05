const express = require("express");
const {
  createMalkhnaMovement,
} = require("../../controller/malkhanaMovementController");
const upload = require("../../middleware/multerMiddleware");
const router = express.Router();
router
  .route("/malkhanaOutMovement")
  .post(
    upload.fields([{ name: "document", maxCount: 10 }]),
    createMalkhnaMovement
  );
module.exports = router;
