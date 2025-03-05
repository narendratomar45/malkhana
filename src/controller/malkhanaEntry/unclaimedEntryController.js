const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const UnclaimedEntry = require("../../model/MalkhanaEntry/unclaimedEntryModel");
const createUnclaimedEntry = async (req, res) => {
  try {
    const {
      firNo,
      firYear,
      mudNo,
      gdNo,
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
        firNo,
        firYear,
        mudNo,
        gdNo,
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
      .resolve(req.files.avatar[0].path)
      .replace(/\\/g, "/");
    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar File required" });
    }

    const avatar = uploadOnCloudinary(avatarLocalPath);
    if (!avatar || !avatar.url) {
      return res.status(400).json({ message: "Avatar upload failed" });
    }
    const unclaimedEntry = await UnclaimedEntry.create({
      firNo,
      firYear,
      mudNo,
      gdNo,
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
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getUnclaimedEntry = async (req, res) => {
  try {
    const otherEntry = await OthersEntry.find();
    return res.status(200).json({ message: "Others Entry Found", otherEntry });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};
module.exports = { createUnclaimedEntry, getUnclaimedEntry };
