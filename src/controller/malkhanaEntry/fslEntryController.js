const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const FslEntry = require("../../model/MalkhanaEntry/fslEntryModel");
const mongoose = require("mongoose");

const createFslEntry = async (req, res) => {
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
      .resolve(req.files.avatar[0]?.path)
      .replace(/\\/g, "/");
    if (!avatarLocalPath) {
      return res.status(400).json("Avatar File required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar || !avatar.url) {
      return res.status(400).json({ message: "Avtar upload failed" });
    }
    const fslEntry = await FslEntry.create({
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
    return res.status(201).json({
      success: true,
      message: "FslEntry created Successfully",
      fslEntry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getFslEntry = async (req, res) => {
  try {
    const fslEntry = await FslEntry.find();
    return res.status(200).json({
      success: true,
      message: "FslEntry Found Successfully",
      fslEntry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const updateFslEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID Format" });
    }
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
    const existingFslEntry = await FslEntry.findById(id);
    if (!existingFslEntry) {
      return res.status(404).json({ message: "FslEntry not Found" });
    }
    const avatarUrl = existingFslEntry.avatar;
    if (req.files?.avatar?.[0]?.path) {
      const avatarLocalPath = path
        .resolve(req.files.avatar[0].path)
        .replace(/\\/g, "/");
      if (!avatarLocalPath) {
        return res.status(400).json({ message: "Avatar file required" });
      }
      const uploadAvatar = await uploadOnCloudinary(avatarLocalPath);
      if (!uploadAvatar || !uploadAvatar.url) {
        return res.status(400).json({ message: "Avatar upload failed" });
      }
      avatarUrl = uploadAvatar.url;
    }
    const updatedFslEntry = await FslEntry.findByIdAndUpdate(
      id,
      {
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
        avatar: avatarUrl,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      success: true,
      message: "FslEntry updated successfully",
      updatedFslEntry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { createFslEntry, getFslEntry, updateFslEntry };
