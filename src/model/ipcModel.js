const mongoose = require("mongoose");
const ipcVehicleSchema = new mongoose.Schema(
  {
    serialNumber: { type: Number, required: true, unique: true },
    gdNumber: { type: Number, required: true, unique: true },
    gdDate: { type: Date, required: true },
    underSection: { type: String, required: true },
    vehicleType: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    chasisNumber: { type: String, required: true, unique: true },
    actType: { type: String, required: true },
    vivechak: { type: String, required: true },
    colour: { type: String },
    engineNumber: { type: String, required: true, unique: true },
    result: {},
    photoUrl: { type: String },
    firNumber: { type: String, required: true, unique: true },
    vehicleOwner: { type: String, required: true },
  },
  { timestamps: true }
);
const IpcVehicle = mongoose.model("IpcVehicle", ipcVehicleSchema);
module.exports = IpcVehicle;
