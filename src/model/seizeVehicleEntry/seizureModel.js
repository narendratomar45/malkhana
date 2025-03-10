const mongoose = require("mongoose");
const seizureVehicleSchema = new mongoose.Schema(
  {
    mudNumber: { type: String, required: true },
    gdNumber: { type: String, required: true },
    gdDate: { type: Date, required: true },
    underSection: { type: String, required: true },
    vehicleType: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    chasisNumber: { type: String, required: true, unique: true },
    actType: { type: String, required: true },
    vivechak: { type: String, required: true },
    colour: { type: String },
    engineNumber: { type: String, required: true, unique: true },
    result: { type: String, required: true },
    document: { type: String },
    firNumber: { type: String, required: true },
    banam: { type: String, required: true },
    vehicleOwner: { type: String, required: true },
    isTracked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const SeizureVehicle = mongoose.model("SeizureVehicle", seizureVehicleSchema);
module.exports = SeizureVehicle;
