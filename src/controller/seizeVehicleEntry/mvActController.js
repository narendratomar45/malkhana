const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const MvActSeizure = require("../../model/seizeVehicleEntry/mvActModel");
const createmvAct = async (req, res) => {
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
        colour,
        engineNumber,
        result,
      ].some((field) => field.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const localPath = path.resolve(req.files.document[0].path);
    if (!localPath) {
      return res.status(400).json({ message: "Document upload failed" });
    }
    const documentFile = await uploadOnCloudinary(localPath);
    if (!documentFile || !documentFile.url) {
      return res.status(400).json({ message: "Document upload failed" });
    }
    const existingMvAct = await MvActSeizure.findOne({
      $or: [{ registrationNumber }, { chasisNumber }, { engineNumber }],
    });
    if (existingMvAct) {
      return res.status(409).json({
        message:
          "Vehicle already exists with the same Registration Number, Chassis Number, or Engine Number",
      });
    }
    const mvAct = await MvActSeizure.create({
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
      document: documentFile.url,
    });
    return res.status(201).json({
      success: true,
      message: "MvActSeizure created successfully",
      mvAct,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { createmvAct };
