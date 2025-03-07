const IpcVehicle = require("../../model/seizeVehicleEntry/ipcModel");
const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const asyncHandler = require("../../utils/asyncHandler");
const ApiError = require("../../utils/ApiError");
const ApiResponse = require("../../utils/ApiResponse");
const MalkhanaRelease = require("../../model/malkhanaRelease/malkhanaReleaseModel");
const createIpc = async (req, res) => {
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
        vehicleOwner,
      ].some((field) => String(field || "").trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingIpc = await IpcVehicle.findOne({
      $or: [{ regNo }, { chasisNumber }, { engineNumber }],
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
const updateIpc = asyncHandler(async (req, res) => {
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
      vehicleOwner,
    ].some((field) => String(field || "").trim() === "")
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingEntry = await IpcVehicle.findById(id);
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

  const updatedEntry = await IpcVehicle.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEntry, "Entry updated successfully"));
});
module.exports = { createIpc, updateIpc };
