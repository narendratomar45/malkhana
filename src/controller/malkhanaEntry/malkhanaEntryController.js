const MalkhanaEntry = require("../../model/MalkhanaEntry/makkhanaEntryModel");
const uploadOnCloudinary = require("../../utilities/cloudinary.js");
const path = require("path");

const createMalkhanaEntry = async (req, res) => {
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
      ].some((field) => field?.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const avatarLocalPath = path
      .resolve(req.files.avatar[0]?.path)
      .replace(/\\/g, "/");
    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar file required" });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar || !avatar.url) {
      console.error("Cloudinary Upload Failed:", avatar);
      return res.status(400).json({ message: "Avatar upload failed" });
    }
    const malkhana = await MalkhanaEntry.create({
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
      message: "Malkhana Entry Created Successfully",
      malkhana,
    });
  } catch (error) {
    console.log("ERROR", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getAllMalkhanaEntry = async (req, res) => {
  try {
    const malkhana = await MalkhanaEntry.find();
    return res
      .status(200)
      .json({ success: true, message: "Malkhana Entry found", malkhana });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const updateMalkhanaEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
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
    if (req.files && req.files.avatar) {
      const avatarLocalPath = req.files.avatar[0]?.path.replace(/\\/g, "/");
      if (avatarLocalPath) {
        const avatarUpload = await uploadOnCloudinary(avatarLocalPath);
        if (avatarUpload && avatarUpload.url) {
        } else {
          return res.status(400).json({ message: "Avatar upload failed" });
        }
      }
    }
    const existingMalkhanaEntry = await MalkhanaEntry.findById(id);
    if (!existingMalkhanaEntry) {
      return res.status(404).json({ message: "Malkhana Entry Not Found" });
    }
    const avatarUrl = existingMalkhanaEntry.avatar;
    if (req.files.avatar[0].path) {
      const avatarLocalPath = path
        .resolve(req.files.avatar[0].path)
        .replace(/\\/g, "/");
      if (!avatarLocalPath) {
        return res.status(400).json({ message: "Avatar file required" });
      }
      const uploadAvatar = await uploadOnCloudinary(avatarLocalPath);
      if (!uploadAvatar || !uploadAvatar.url) {
        return res.status({ message: "Avtar Upload failed" });
      }
    }
    avatarUrl = uploadAvatar.url;
    const malkhana = await MalkhanaEntry.findByIdAndUpdate(
      id,
      {
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
        avatar: avatarUrl,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Malkhana Updated Successfully",
      malkhana,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  createMalkhanaEntry,
  getAllMalkhanaEntry,
  updateMalkhanaEntry,
};
