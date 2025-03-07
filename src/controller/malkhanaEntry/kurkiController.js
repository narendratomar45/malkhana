const KurkiEntry = require("../../model/MalkhanaEntry/kurkiEntryModel.js");
const uploadOnCloudinary = require("../../utilities/cloudinary.js");
const path = require("path");

const createKurkiEntry = async (req, res) => {
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
    const Kurki = await KurkiEntry.create({
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
      message: "Kurki Entry Created Successfully",
      Kurki,
    });
  } catch (error) {
    console.log("ERROR", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getAllKurkiEntry = async (req, res) => {
  try {
    const kurki = await KurkiEntry.find();
    return res
      .status(200)
      .json({ success: true, message: "Kurki Entry found", kurki });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const updateKurkiEntry = async (req, res) => {
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
    const existingKurkiEntry = await KurkiEntry.findById(id);
    if (!existingKurkiEntry) {
      return res.status(404).json({ message: "Kurki Entry Not Found" });
    }
    const avatarUrl = existingKurkiEntry.avatar;
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
    const kurki = await KurkiEntry.findByIdAndUpdate(
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
      message: "Kurki Updated Successfully",
      kurki,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  createKurkiEntry,
  getAllKurkiEntry,
  updateKurkiEntry,
};
