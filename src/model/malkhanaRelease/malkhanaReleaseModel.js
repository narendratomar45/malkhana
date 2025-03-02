const mongoose = require("mongoose");
const malkhanaReleaseSchema = mongoose.Schema({
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
  mudNo: { type: String, required: true },
  receiverName: { type: String, required: true },
  fatherName: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true },
  releaseItems: { type: String, required: true },
});
