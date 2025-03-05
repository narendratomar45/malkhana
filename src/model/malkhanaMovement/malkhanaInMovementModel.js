const mongoose = require("mongoose");
const malkhanaOutMovementSchema = mongoose.Schema(
  {
    entryType: {
      type: String,
      required: true,
      enum: [
        "Malkhana_Entry",
        "FSL_Entry",
        "Kurki_Entry",
        "Other_Entry",
        "Unclaimed_Entry",
        "MVAct_Seizure",
        "ARTO_Seizure",
        "IPC_Vehicle",
        "Excise_Vehicle",
        "Unclaimed_Vehicle",
        "Seizure_Vehicle",
      ],
    },
    firNo: { type: String, required: true, trim: true },
    mudNo: { type: String, required: true, trim: true },
    takenOutBy: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    recievedBy: { type: String, required: true },
    document: { type: String },
  },
  { timestamps: true }
);
const MalkhanaOutMovement = mongoose.model(
  "MalkhanaOutMovement",
  malkhanaOutMovementSchema
);
module.exports = MalkhanaOutMovement;
