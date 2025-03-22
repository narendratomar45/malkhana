const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const FslEntry = require("../../model/MalkhanaEntry/fslEntryModel");
const mongoose = require("mongoose");

const createFslEntry = async (req, res) => {
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
      !firNumber ||
      !firYear ||
      !mudNumber ||
      !gdNumber ||
      !gdDate ||
      !ioName ||
      !dakhilKarneWala ||
      !banam ||
      !caseProperty ||
      !underSection ||
      !actType ||
      !description ||
      !place ||
      !court ||
      !status
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = req.user;
    console.log("USER", user);

    const documentLocalPath = path
      .resolve(req.files.document[0]?.path)
      .replace(/\\/g, "/");
    if (!documentLocalPath) {
      return res.status(400).json("document File required");
    }
    const document = await uploadOnCloudinary(documentLocalPath);
    if (!document || !document.url) {
      return res.status(400).json({ message: "Avtar upload failed" });
    }
    const fslEntry = await FslEntry.create({
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
      document: document.url,
      policeStation: user.policeStation,
      district: user.district,
    });
    return res.status(201).json({
      success: true,
      message: "FslEntry created Successfully",
      fslEntry,
    });
  } catch (error) {
    console.log("ERROR", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getFslEntry = async (req, res) => {
  try {
    const user = req.user;
    console.log("USER", user);
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
    const existingFslEntry = await FslEntry.findById(id);
    if (!existingFslEntry) {
      return res.status(404).json({ message: "FslEntry not Found" });
    }
    const documentUrl = existingFslEntry.document;
    if (req.files?.document?.[0]?.path) {
      const documentLocalPath = path
        .resolve(req.files.document[0].path)
        .replace(/\\/g, "/");
      if (!documentLocalPath) {
        return res.status(400).json({ message: "document file required" });
      }
      const uploaddocument = await uploadOnCloudinary(documentLocalPath);
      if (!uploaddocument || !uploaddocument.url) {
        return res.status(400).json({ message: "document upload failed" });
      }
      documentUrl = uploaddocument.url;
    }
    const updatedFslEntry = await FslEntry.findByIdAndUpdate(
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
        document: documentUrl,
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
