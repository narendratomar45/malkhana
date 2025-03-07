const mongoose = require("mongoose");

const artoSeizureSchema = new mongoose.Schema(
  {
    mudNo: { type: Number, required: true },
    gdNumber: { type: Number, required: true },
    gdDate: { type: Date, required: true },
    underSection: { type: String, required: true },
    vehicleType: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    chasisNumber: { type: String, required: true, unique: true },
    actType: { type: String, required: true },
    colour: { type: String },
    engineNumber: { type: String, required: true, unique: true },
    result: { type: String, required: true },
    document: { type: String },
    isTracked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ArtoSeizure = mongoose.model("ArtoSeizure", artoSeizureSchema);

module.exports = ArtoSeizure;
