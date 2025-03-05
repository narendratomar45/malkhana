const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const SeizureVehicle = require("../../model/seizeVehicleEntry/seizureModel");
const createSiezure = async (req, res) => {
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
      vivechak,
      colour,
      engineNumber,
      firNumber,
      banam,
      result,
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
        vivechak,
        colour,
        engineNumber,
        firNumber,
        banam,
        result,
      ].some((field) => field.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const localPath = path.resolve(req.files.document[0].path);
    if (!localPath) {
      return res.status(400).json({ message: "Document upload failed" });
    }
    console.log("LOCALPATH", localPath);

    const documentFile = await uploadOnCloudinary(localPath);
    if (!documentFile || !documentFile.url) {
      return res.status(400).json({ message: "Document upload failed" });
    }
    console.log("DOCUMENT", documentFile);
    console.log("DOCUMENTURL", documentFile.url);

    const existingSiezure = await SeizureVehicle.findOne({
      $or: [{ registrationNumber }, { chasisNumber }, { engineNumber }],
    });
    if (existingSiezure) {
      return res.status(409).json({
        message:
          "Vehicle already exists with the same Registration Number, Chassis Number, or Engine Number",
      });
    }
    const siezure = await SeizureVehicle.create({
      serialNumber,
      gdNumber,
      gdDate,
      underSection,
      vehicleType,
      registrationNumber,
      chasisNumber,
      actType,
      vivechak,
      colour,
      engineNumber,
      firNumber,
      banam,
      result,
      document: documentFile.url,
    });
    return res.status(201).json({
      success: true,
      message: "Siezure Vehicle created successfully",
      siezure,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { createSiezure };
