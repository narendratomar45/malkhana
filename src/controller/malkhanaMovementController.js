const Fsl_Entry = require("../model/MalkhanaEntry/fslEntryModel");
const Kurki_Entry = require("../model/MalkhanaEntry/kurkiEntryModel");
const Malkhana_Entry = require("../model/MalkhanaEntry/makkhanaEntryModel");
const Others_Entry = require("../model/MalkhanaEntry/othersEntryModel");
const Unclaimed_Entry = require("../model/MalkhanaEntry/unclaimedEntryModel");
const Arto_Seizure = require("../model/seizeVehicleEntry/artoModel");
const Excise_Vehicle = require("../model/seizeVehicleEntry/exciseModel");
const Ipc_Vehicle = require("../model/seizeVehicleEntry/ipcModel");
const MvAct_Seizure = require("../model/seizeVehicleEntry/mvActModel");
const Seizure_Vehicle = require("../model/seizeVehicleEntry/seizureModel");
const Unclaimed_Vehicle = require("../model/seizeVehicleEntry/unclaimedModel");
const MalkhanaOutMovement = require("../model/malkhanaMovement/malkhanaOutMovementModel");
const path = require("path");
const uploadOnCloudinary = require("../utilities/cloudinary");
const models = {
  Malkhana_Entry: Malkhana_Entry,
  FSL_Entry: Fsl_Entry,
  Kurki_Entry: Kurki_Entry,
  Other_Entry: Others_Entry,
  Unclaimed_Entry: Unclaimed_Entry,
  MVAct_Seizure: MvAct_Seizure,
  ARTO_Seizure: Arto_Seizure,
  IPC_Vehicle: Ipc_Vehicle,
  Excise_Vehicle: Excise_Vehicle,
  Unclaimed_Vehicle: Unclaimed_Vehicle,
  Seizure_Vehicle: Seizure_Vehicle,
};

const createMalkhnaMovement = async (req, res) => {
  try {
    const {
      entryType,
      mudNumber,
      firNumber,
      takenOutBy,
      trackingBy,
      description,
    } = req.body;
    if (
      !entryType ||
      !firNumber ||
      !mudNumber ||
      !takenOutBy ||
      !trackingBy ||
      !description
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const Model = models[entryType];
    if (!Model) {
      return res.status(400).json({ message: "Invalid entryType" });
    }
    const entry = await Model.findOne({ firNumber, mudNumber });
    if (!entry) {
      return res
        .status(400)
        .json({ message: "Mud Number not found in the selected Entry Type" });
    }
    const existingTracking = await MalkhanaOutMovement.findOne({
      firNumber,
      mudNumber,
    });
    if (existingTracking) {
      return res
        .status(409)
        .json({ message: "Selected Mud Number already being tracked" });
    }
    const localPath = path.resolve(req.files.document[0].path);
    if (!localPath) {
      return res.status(400).json({ message: "document file is required" });
    }
    const documentFile = await uploadOnCloudinary(localPath);
    if (!documentFile || !documentFile.url) {
      return res.status(400).json({ message: "document upload failed" });
    }
    const malkhanaMovement = await MalkhanaOutMovement.create({
      entryType,
      firNumber,
      mudNumber,
      takenOutBy,
      trackingBy,
      description,
      document: documentFile.url,
    });
    await Model.updateOne(
      { firNumber, mudNumber },
      { $set: { isTracked: true } }
    );
    return res
      .status(201)
      .json({ message: "Malkhna Movement is created", malkhanaMovement });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getUntrackedMudNumbers = async (req, res) => {
  try {
    const { entryType, firNumber } = req.query;

    if (!entryType || !firNumber) {
      return res
        .status(400)
        .json({ message: "Entry Type and FIR No are required" });
    }

    const Model = models[entryType];
    if (!Model) {
      return res.status(400).json({ message: "Invalid entryType" });
    }

    const untrackedMudNumbers = await Model.find({
      firNumber,
      isTracked: { $ne: true },
    }).select("mudNumber");

    return res.status(200).json({ untrackedMudNumbers });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const getTrackedMudNumbers = async (req, res) => {
  try {
    const { firNumber } = req.query;

    if (!firNumber) {
      return res.status(400).json({ message: "FIR No is required" });
    }

    const trackedMudNumbers = await MalkhanaOutMovement.find({
      firNumber,
    }).select("mudNumber trackingBy");

    return res.status(200).json({ trackedMudNumbers });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createMalkhnaMovement,
  getUntrackedMudNumbers,
  getTrackedMudNumbers,
};
