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

    const user = req.user;
    const documentLocalPath = path
      .resolve(req.files.document[0]?.path)
      .replace(/\\/g, "/");
    if (!documentLocalPath) {
      return res.status(400).json({ message: "document file required" });
    }

    const document = await uploadOnCloudinary(documentLocalPath);
    if (!document || !document.url) {
      console.error("Cloudinary Upload Failed:", document);
      return res.status(400).json({ message: "document upload failed" });
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
      document: document.url,
      district: user.district,
      policeStation: user.policeStation,
    });
    return res.status(201).json({
      success: true,
      message: "Malkhana Entry Created Successfully",
      data: malkhana,
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
    if (req.files && req.files.document) {
      const documentLocalPath = req.files.document[0]?.path.replace(/\\/g, "/");
      if (documentLocalPath) {
        const documentUpload = await uploadOnCloudinary(documentLocalPath);
        if (documentUpload && documentUpload.url) {
        } else {
          return res.status(400).json({ message: "document upload failed" });
        }
      }
    }
    const existingMalkhanaEntry = await MalkhanaEntry.findById(id);
    if (!existingMalkhanaEntry) {
      return res.status(404).json({ message: "Malkhana Entry Not Found" });
    }
    const documentUrl = existingMalkhanaEntry.document;
    if (req.files.document[0].path) {
      const documentLocalPath = path
        .resolve(req.files.document[0].path)
        .replace(/\\/g, "/");
      if (!documentLocalPath) {
        return res.status(400).json({ message: "document file required" });
      }
      const uploaddocument = await uploadOnCloudinary(documentLocalPath);
      if (!uploaddocument || !uploaddocument.url) {
        return res.status({ message: "Avtar Upload failed" });
      }
    }
    documentUrl = uploaddocument.url;
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
        document: documentUrl,
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
