const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const MvActSeizure = require("../../model/seizeVehicleEntry/mvActModel");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const MalkhanaRelease = require("../../model/malkhanaRelease/malkhanaReleaseModel");
const createmvAct = async (req, res) => {
  try {
    const {
      mudNumber,
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
      [
        mudNumber,
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
      $or: [{ regNo }, { chasisNumber }, { engineNumber }],
    });
    if (existingMvAct) {
      return res.status(409).json({
        message:
          "Vehicle already exists with the same Registration Number, Chassis Number, or Engine Number",
      });
    }
    const mvAct = await MvActSeizure.create({
      mudNumber,
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
const updateMvAct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Id not found" });
  }

  const {
    mudNumber,
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
    [
      mudNumber,
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
    ].some((field) => field.trim() === "")
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingEntry = await MvActSeizure.findById(id);
  if (!existingEntry) {
    throw new ApiError(404, "data not found");
  }
  const existingmudNumber = existingEntry.mudNumber;

  const releaseItem = await MalkhanaRelease.find({
    mudNumber: existingmudNumber,
  });
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

  const updatedEntry = await MvActSeizure.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEntry, "Entry updated successfully"));
});
module.exports = { createmvAct, updateMvAct };
