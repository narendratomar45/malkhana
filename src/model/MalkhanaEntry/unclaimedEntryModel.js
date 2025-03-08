const mongoose = require("mongoose");
const unclaimedEntrySchema = new mongoose.Schema({
  firNumber: { type: String, required: true },
  firYear: { type: String, required: true },
  mudNumber: { type: String, required: true },
  gdNumber: { type: String, required: true },
  gdDate: { type: String, required: true },
  ioName: { type: String, required: true },
  dakhilKarneWala: { type: String, required: true },
  banam: { type: String, required: true },
  caseProperty: { type: String, required: true },
  underSection: { type: String, required: true },
  actType: { type: String, required: true },
  description: { type: String, required: true },
  place: { type: String, required: true },
  court: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  document: { type: String, required: true },
  isTracked: { type: Boolean, default: false },
});
const UnclaimedEntry = mongoose.model("UnclaimedEntry", unclaimedEntrySchema);
module.exports = UnclaimedEntry;
