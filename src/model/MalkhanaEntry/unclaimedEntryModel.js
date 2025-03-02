const mongoose = require("mongoose");
const unclaimedEntrySchema = new mongoose.Schema({
  firNo: { type: String, required: true, trim: true },
  firYear: { type: String, required: true, trim: true },
  mudNo: { type: String, required: true, trim: true },
  gdNo: { type: String, required: true, trim: true },
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
  photoUrl: { type: String, required: true, trim: true },
});
const UnclaimedEntry = mongoose.model("UnclaimedEntry", unclaimedEntrySchema);
module.exports = UnclaimedEntry;
