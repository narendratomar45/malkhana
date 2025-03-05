const IpcVehicle = require("../../model/seizeVehicleEntry/ipcModel");
const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const createIpc = async (req, res) => {
  try {
    const {
      serialNumber,
      gdNumber,
      gdDate,
      underSection,
      vehicleType,
      registrationNumber,
      chasisNumber,
      actType,
      colour,
      engineNumber,
      vivechak,
      result,
      firNumber,
      vehicleOwner,
    } = req.body;
    if (
      [
        serialNumber,
        gdNumber,
        gdDate,
        underSection,
        vehicleType,
        registrationNumber,
        chasisNumber,
        actType,
        colour,
        engineNumber,
        result,
        vivechak,
        firNumber,
        vehicleOwner,
      ].some((field) => String(field || "").trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingIpc = await IpcVehicle.findOne({
      $or: [{ registrationNumber }, { chasisNumber }, { engineNumber }],
    });
    if (existingIpc) {
      return res.status(409).json({
        message:
          "Vehicle already exists with the same Registration Number, Chassis Number, or Engine Number",
      });
    }
    const localPath = path.resolve(req.files.document[0].path);
    if (!localPath) {
      return res.status(400).json({ message: "Document file is required" });
    }

    const documentFile = await uploadOnCloudinary(localPath);
    if (!documentFile || !documentFile.url) {
      return res.status(400).json({ message: "Upload document failed" });
    }
  

    const ipc = await IpcVehicle.create({
      serialNumber,
      gdNumber,
      gdDate,
      underSection,
      vehicleType,
      registrationNumber,
      chasisNumber,
      actType,
      colour,
      engineNumber,
      vivechak,
      result,
      firNumber,
      vehicleOwner,
      document: documentFile.url,
    });
    return res.status(201).json({
      success: true,
      message: "Ipc Vehicle Created Successfully",
      data: ipc,
    });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = createIpc;
