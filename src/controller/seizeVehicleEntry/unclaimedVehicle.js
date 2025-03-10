const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const UnclaimedVehicle = require("../../model/seizeVehicleEntry/unclaimedModel");
const createUnclaimedVehicle = async (req, res) => {
  try {
    const {
      firNumber,
      mudNumber,
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
      vehicleOwner,
      vivechak,
    } = req.body;
    if (
      !mudNumber ||
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
      !vehicleOwner
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
    console.log("DF", documentFile);

    if (!regNo || regNo.trim() === "") {
      return res
        .status(400)
        .json({ message: "Registration number is required" });
    }
    if (!chasisNumber || chasisNumber.trim() === "") {
      return res.status(400).json({ message: "Chasis number is required" });
    }
    if (!engineNumber || engineNumber.trim() === "") {
      return res.status(400).json({ message: "Engine number is required" });
    }
    const unclaimedVehicle = await UnclaimedVehicle.create({
      firNumber,
      mudNumber,
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
      vehicleOwner,
      vivechak,
      document: documentFile.url,
    });
    return res.status(201).json({
      success: true,
      message: "Unclaimed Vehicle entry created successfully",
      unclaimedVehicle,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getUnclaimedVehicle = async (req, res) => {
  try {
    const unclaimedVehicle = await UnclaimedVehicle.find();
    if (!unclaimedVehicle) {
      return res.status(400).json({ message: "No data found" });
    }
    return res.status(200).json({
      success: true,
      message: "Unclaimed Vehicle record found",
      unclaimedVehicle,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const updatedUnclaimedVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id not found" });
    }
    const {
      firNumber,
      mudNumber,
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
      vehicleOwner,
      vivechak,
    } = req.body;
    if (
      !mudNumber ||
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

    const existingUnclaimedVehicle = await UnclaimedVehicle.findById(id);
    if (!existingUnclaimedVehicle) {
      return res.status(400).json({ message: "No record found" });
    }
    const documentFile = existingUnclaimedVehicle.document;
    if (req.files && req.files.document) {
      const localPath = path.resolve(req.files.document[0].path);
      if (!localPath) {
        const uploadFile = await uploadOnCloudinary(localPath);
        if (uploadFile && uploadFile.url) {
          documentFile = uploadFile.url;
        } else {
          return res.status(400).json({ message: "Upload Document failed" });
        }
      }
    } else if (!documentFile) {
      return res.status(400).json({ message: "Document file require" });
    }
    const updatedVehicle = await UnclaimedVehicle.findByIdAndUpdate(
      id,
      {
        firNumber,
        mudNumber,
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
        vehicleOwner,
        vivechak,
        banam,
        document: documentFile,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      success: true,
      message: "Unclaimed Vehicle entry updated successfully",
      updatedVehicle,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  createUnclaimedVehicle,
  getUnclaimedVehicle,
  updatedUnclaimedVehicle,
};
