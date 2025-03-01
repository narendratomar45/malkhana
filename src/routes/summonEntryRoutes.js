const express = require("express");
const {
  createSummonEntry,
  getSummonEntry,
  getAllSummonEntry,
  updateSummonEntry,
  deleteSummonEntry,
} = require("../controller/summonContoller");
const router = express.Router();
router.post("/summonEntry", createSummonEntry);
router.get("/getSummonEntry/:id", getSummonEntry);
router.get("/getSummonEntry", getAllSummonEntry);
router.post("/updateSummonEntry/:id", updateSummonEntry);
router.post("/deleteSummonEntry/:id", deleteSummonEntry);
module.exports = router;
