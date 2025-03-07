const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const OthersEntry = require("../../model/MalkhanaEntry/othersEntryModel");
const createOtherEntry = async (req, res) => {
  try {
    const {
      firNumber,
      firYear,
      mudNumber,
      gdNumber,
      gdDate,
      ioName,
      dakhilKarneWala,
      banam,
      caseProperty,
      underSection,
      actType,
      description,
      place,
      court,
      status,
    } = req.body;
    if (
      [
        firNumber,
        firYear,
        mudNumber,
        gdNumber,
        gdDate,
        ioName,
        dakhilKarneWala,
        banam,
        caseProperty,
        underSection,
        actType,
        description,
        place,
        court,
        status,
      ].some((field) => field.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const avatarLocalPath = path
      .resolve(req.files.avatar[0]?.path)
      .replace(/\\/g, "/");
    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar File required" });
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar || !avatar.url) {
      return res.status(400).json({ message: "Avatar upload failed" });
    }
    const otherEntry = await OthersEntry.create({
      firNumber,
      firYear,
      mudNumber,
      gdNumber,
      gdDate,
      ioName,
      dakhilKarneWala,
      banam,
      caseProperty,
      underSection,
      actType,
      description,
      place,
      court,
      status: status || "Pending",
      avatar: avatar.url,
    });
    return res.status(201).json({
      success: true,
      message: "OthersEntry created successfully",
      otherEntry,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getOthersEntry = async (req, res) => {
  try {
    const otherEntry = await OthersEntry.find();
    return res.status(200).json({ message: "Others Entry Found", otherEntry });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};
const updateOtherEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "invalid Credentails" });
    }
    const {
      firNumber,
      firYear,
      mudNumber,
      gdNumber,
      gdDate,
      ioName,
      dakhilKarneWala,
      banam,
      caseProperty,
      underSection,
      actType,
      description,
      place,
      court,
      status,
    } = req.body;
    const existingOthersEntry = await OthersEntry.findById(id);

    // let avatarUrl =
  } catch (error) {}
};
module.exports = { createOtherEntry, getOthersEntry };
