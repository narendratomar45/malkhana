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
    const user = user.req;
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
      document: document.url,
      policeStation: user.policeStation,
      district: user.district,
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
    const existingKurkiEntry = await KurkiEntry.findById(id);
    if (!existingKurkiEntry) {
      return res.status(404).json({ message: "Kurki Entry Not Found" });
    }
    const documentUrl = existingKurkiEntry.document;
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
        document: documentUrl,
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
