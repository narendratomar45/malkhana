const express = require("express");
const {
  createSummonEntry,
  getAllSummonEntry,
  updateSummonEntry,
  deleteSummonEntry,
} = require("../controller/summonContoller");
const router = express.Router();
router
  .route("/summonEntry")
  .post(createSummonEntry)
  .get(getAllSummonEntry);
router
  .route("/summonEntry/:id")
  .patch(updateSummonEntry)
  .delete(deleteSummonEntry);

module.exports = router;
