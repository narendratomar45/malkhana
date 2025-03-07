const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const SeizureVehicle = require("../../model/seizeVehicleEntry/seizureModel");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const MalkhanaRelease = require("../../model/malkhanaRelease/malkhanaReleaseModel");
const createSiezure = async (req, res) => {
  try {
    const {
      mudNo,
      gdNumber,
      underSection,
      vehicleType,
      regNo,
      chasisNumber,
      engineNumber,
      colour,
      gdDate,
      actType,
      result,
      firNumber,
      vehicleOwner,
      vivechak,
      banam,
    } = req.body;
    if (
      !mudNo ||
      !gdNumber ||
      !underSection ||
      !vehicleType ||
      !regNo ||
      !chasisNumber ||
      !engineNumber ||
      !colour ||
      !gdDate ||
      !actType ||
      !result ||
      !vivechak ||
      !firNumber ||
      !banam ||
      !vehicleOwner
    ) {
      throw new ApiError(400, "All fields are required");
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
      $or: [{ regNo }, { chasisNumber }, { engineNumber }],
    });
    if (existingSiezure) {
      return res.status(409).json({
        message:
          "Vehicle already exists with the same Registration Number, Chassis Number, or Engine Number",
      });
    }
    const siezure = await SeizureVehicle.create({
      mudNo,
      gdNumber,
      gdDate,
      underSection,
      vehicleType,
      regNo,
      chasisNumber,
      actType,
      vivechak,
      colour,
      engineNumber,
      vehicleOwner,
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
const updateSeizureVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id not found" });
  }

  const {
    mudNo,
    gdNumber,
    underSection,
    vehicleType,
    regNo,
    chasisNumber,
    engineNumber,
    colour,
    gdDate,
    actType,
    result,
    firNumber,
    vehicleOwner,
    vivechak,
    banam,
  } = req.body;

  if (
    !mudNo ||
    !gdNumber ||
    !underSection ||
    !vehicleType ||
    !regNo ||
    !chasisNumber ||
    !engineNumber ||
    !colour ||
    !gdDate ||
    !actType ||
    !result ||
    !vivechak ||
    !firNumber ||
    !banam ||
    !vehicleOwner
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingEntry = await SeizureVehicle.findById(id);
  if (!existingEntry) {
    throw new ApiError(404, "Entry not found");
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

module.exports = { createSiezure, updateSeizureVehicle };
