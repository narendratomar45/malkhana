const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const ExciseVehicle = require("../../model/seizeVehicleEntry/exciseModel");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const MalkhanaRelease = require("../../model/malkhanaRelease/malkhanaReleaseModel");
const createExcise = async (req, res) => {
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
      vivechak,
      result,
      firNumber,
      banam,
      vehicleOwner,
    } = req.body;
    if (
      [
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
        vivechak,
        firNumber,
        banam,
        vehicleOwner,
      ].some((field) => field.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingVehicle = await ExciseVehicle.findOne({
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
    if (!documentUrl || !documentUrl.url) {
      return res.status(400).json({ message: "Failed to upload document" });
    }
    const excise = await ExciseVehicle.create({
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
const updateExcise = asyncHandler(async (req, res) => {
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
    vivechak,
    result,
    firNumber,
    banam,
    vehicleOwner,
  } = req.body;

  if (
    [
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
      vivechak,
      firNumber,
      banam,
      vehicleOwner,
    ].some((field) => field.trim() === "")
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingEntry = await ExciseVehicle.findById(id);
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

  const updatedEntry = await ExciseVehicle.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEntry, "Entry updated successfully"));
});
module.exports = { createExcise, updateExcise };
