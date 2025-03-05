const path = require("path");
const ArtoSeizure = require("../../model/seizeVehicleEntry/artoModel");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const createArtoSeizure = async (req, res) => {
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
      !serialNumber ||
      !gdNumber ||
      !gdDate ||
      !underSection ||
      !vehicleType ||
      !registrationNumber ||
      !chasisNumber ||
      !actType ||
      !engineNumber ||
      !result
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check for duplicate vehicle records
    const existingVehicle = await ArtoSeizure.findOne({
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
    if (!documentUrl) {
      return res.status(400).json({ message: "Document upload failed" });
    }

    // Create new record
    const newArtoSeizure = await ArtoSeizure.create({
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
      document: documentUrl.url,
    });

    return res.status(201).json({
      message: "Arto Seizure record created successfully",
      data: newArtoSeizure,
    });
  } catch (error) {
    console.error("Error creating Arto Seizure:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = createArtoSeizure;
