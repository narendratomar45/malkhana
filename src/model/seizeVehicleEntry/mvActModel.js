const mongoose = require("mongoose");

const mvActSchema = new mongoose.Schema(
  {
    serialNumber: { type: Number, required: true },
    gdNumber: { type: Number, required: true },
    gdDate: { type: Date, required: true },
    underSection: { type: String, required: true },
    vehicleType: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
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

const MvActSeizure = mongoose.model("MvActSeizure", mvActSchema);

module.exports = MvActSeizure;
