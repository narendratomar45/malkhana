const path = require("path");
const uploadOnCloudinary = require("../../utilities/cloudinary");
const UnclaimedEntry = require("../../model/MalkhanaEntry/unclaimedEntryModel");
const createUnclaimedEntry = async (req, res) => {
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
    const documentLocalPath = path
      .resolve(req.files?.document[0]?.path)
      .replace(/\\/g, "/");
    if (!documentLocalPath) {
      return res.status(400).json({ message: "document File required" });
    }
    console.log("fiels", req.files);
    console.log("path", documentLocalPath);

    const document = uploadOnCloudinary(documentLocalPath);
    if (!document || !document.url) {
      return res.status(400).json({ message: "document upload failed" });
    }
    console.log("DOCUMENT", document);

    const unclaimedEntry = await UnclaimedEntry.create({
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
    });
    return res.status(201).json({
      success: true,
      message: "Unclaimed Entry created successfully",
      unclaimedEntry,
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
    const otherEntry = await UnclaimedEntry.find();
    return res.status(200).json({ message: "Others Entry Found", otherEntry });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
};
module.exports = { createUnclaimedEntry, getUnclaimedEntry };
