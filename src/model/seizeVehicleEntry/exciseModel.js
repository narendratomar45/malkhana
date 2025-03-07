const mongoose = require("mongoose");
const exciseVehicleSchema = new mongoose.Schema(
  {
    mudNo: { type: Number, required: true, unique: true },
    gdNumber: { type: Number, required: true, unique: true },
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
    firNumber: { type: String, required: true, unique: true },
    banam: { type: String, required: true },
    vehicleOwner: { type: String, required: true },
    document: { type: String },
    isTracked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const ExciseVehicle = mongoose.model("ExciseVehicle", exciseVehicleSchema);
module.exports = ExciseVehicle;
