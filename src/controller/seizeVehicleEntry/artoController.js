const path = require("path");
const ArtoSeizure = require("../../model/seizeVehicleEntry/artoModel");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const MalkhanaRelease = require("../../model/malkhanaRelease/malkhanaReleaseModel");
const SeizureVehicle = require("../../model/seizeVehicleEntry/seizureModel");
const createArtoSeizure = async (req, res) => {
  try {
    const {
      mudNo,
      gdNumber,
      gdDate,
      underSection,
      vehicleType,
      regNo,
      chasisNumber,
      actType,
      colour,
      engineNumber,
      result,
    } = req.body;

    if (
      !mudNo ||
      !gdNumber ||
      !gdDate ||
      !underSection ||
      !vehicleType ||
      !regNo ||
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
      $or: [{ regNo }, { chasisNumber }, { engineNumber }],
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
      mudNo,
      gdNumber,
      gdDate,
      underSection,
      vehicleType,
      regNo,
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

const updateArto = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id not found" });
  }

  const {
    mudNo,
    gdNumber,
    gdDate,
    underSection,
    vehicleType,
    regNo,
    chasisNumber,
    actType,
    colour,
    engineNumber,
    result,
  } = req.body;

  if (
    !mudNo ||
    !gdNumber ||
    !gdDate ||
    !underSection ||
    !vehicleType ||
    !regNo ||
    !chasisNumber ||
    !actType ||
    !colour ||
    !engineNumber ||
    !result
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  const existingEntry = await ArtoSeizure.findById(id);
  if (!existingEntry) {
    throw new ApiError(404, "data not found");
  }
  const existingMudNo = existingEntry.mudNo;

  const releaseItem = await MalkhanaRelease.find({ mudNo: existingMudNo });
  if (releaseItem.length > 0) {
    throw new ApiError(400, "Modification is not allowed for released data");
  }
  if (req.files?.document?.[0]?.path) {
    const documentFile = req.files.document[0].path;
    const documentUploadResult = await uploadOnCloudinary(documentFile);

    if (!documentUploadResult?.url) {
      throw new ApiError(500, "Failed to upload new document file");
    }

    req.body.document = documentUploadResult.url;
  }

  const updatedEntry = await SeizureVehicle.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEntry, "Entry updated successfully"));
});

module.exports = { createArtoSeizure, updateArto };
