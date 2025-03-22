const mongoose = require("mongoose");
const fslEntrySchema = new mongoose.Schema({
  firNumber: { type: String, required: true, trim: true },
  firYear: { type: String, required: true, trim: true },
  mudNumber: { type: String, required: true, trim: true },
  gdNumber: { type: String, required: true, trim: true },
  gdDate: { type: String, required: true, trim: true },
  ioName: { type: String, required: true, trim: true },
  dakhilKarneWala: { type: String, required: true, trim: true },
  banam: { type: String, required: true, trim: true },
  caseProperty: { type: String, required: true, trim: true },
  underSection: { type: String, required: true, trim: true },
  actType: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  place: { type: String, required: true, trim: true },
  court: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true, default: "Pending" },
  document: { type: String, required: true, trim: true },
  isTracked: { type: Boolean, default: false },
  district: { type: String },
  policeStation: { type: String },
});
const FslEntry = mongoose.model("FslEntry", fslEntrySchema);
module.exports = FslEntry;
