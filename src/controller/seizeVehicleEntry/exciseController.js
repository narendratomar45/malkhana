const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const ExciseVehicle = require("../../model/seizeVehicleEntry/exciseModel");
const createExcise = async (req, res) => {
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
      banam,
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
        banam,
        vehicleOwner,
      ].some((field) => field.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingVehicle = await ExciseVehicle.findOne({
      $or: [{ registrationNumber }, { chasisNumber }, { engineNumber }],
    });

    if (existingVehicle) {
      return res.status(409).json({
        message:
          "Vehicle already exists with the same Registration Number, Chassis Number, or Engine Number",
      });
    }

    const localPath = path.resolve(req.files.document[0].path);
    if (!localPath) {
      return res.status(400).json({ message: "Document file required" });
    }
    const documentUrl = await uploadOnCloudinary(localPath);
    if (!documentUrl || !documentUrl.url) {
      return res.status(400).json({ message: "Failed to upload document" });
    }
    const excise = await ExciseVehicle.create({
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
      firNumber,
      vivechak,
      banam,
      vehicleOwner,
      document: documentUrl.url,
    });
    return res.status(201).json({
      success: true,
      message: "ExciseVehicle created Successfully",
      excise,
    });
  } catch (error) {
    console.log("ERROR", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = createExcise;
