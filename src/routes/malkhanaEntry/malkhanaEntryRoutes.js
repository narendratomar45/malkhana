const express = require("express");
const {
  createMalkhanaEntry,
  getAllMalkhanaEntry,
  updateMalkhanaEntry,
} = require("../../controller/malkhanaEntry/malkhanaEntryController");
const upload = require("../../middleware/multerMiddleware");
const userAuth = require("../../middleware/authMiddleware");
const router = express.Router();
router.use(userAuth);
router
  .route("/malkhanaEntry")
  .post(
    upload.fields([{ name: "document", maxCount: 10 }]),
    createMalkhanaEntry
  )
  .get(getAllMalkhanaEntry);
router
  .route("/malkhanaEntry/:id")
  .patch(
    upload.fields([{ name: "document", maxCount: 10 }]),
    updateMalkhanaEntry
  );
module.exports = router;
