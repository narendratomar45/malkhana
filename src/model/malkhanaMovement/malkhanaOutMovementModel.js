const mongoose = require("mongoose");
const malkhanaOutMovementSchema = mongoose.Schema(
  {
    entryType: {
      type: String,
      required: true,
      enum: [
        "Malkhana Entry",
        "FSL Entry",
        "Kurki Entry",
        "Other Entry",
        "Unclaimed Entry",
        "MV Act Seizure",
        "ARTO Seizure",
        "IPC Vehicle",
        "Excise Vehicle",
        "Unclaimed Vehicle",
        "Seizure Vehicle",
      ],
    },
    firNo: { type: String, required: true, trim: true },
    mudNo: { type: String, required: true, trim: true },
    takenOutBy: { type: String, required: true, trim: true },
    trackingBy: {
      type: String,
      required: true,
      enum: [
        "Malkhana Entry",
        "FSL Entry",
        "Kurki Entry",
        "Other Entry",
        "Unclaimed Entry",
        "MV Act Seizure",
        "ARTO Seizure",
        "IPC Vehicle",
        "Excise Vehicle",
        "Unclaimed Vehicle",
        "Seizure Vehicle",
      ],
    },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
const MalkhanaOutMovement = mongoose.model(
  "MalkhanaOutMovement",
  malkhanaOutMovementSchema
);
module.exports = MalkhanaOutMovement;
