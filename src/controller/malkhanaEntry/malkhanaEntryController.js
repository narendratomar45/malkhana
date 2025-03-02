const MalkhanaEntry = require("../../model/MalkhanaEntry/makkhanaEntryModel");

const createMalkhanaEntry = async (req, res) => {
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
    {
      /** 
      if (
      !firNo ||
      !firYear ||
      !mudNo ||
      !gdNo ||
      !gdDate ||
      !ioName ||
      !dakhilKarneWala ||
      !banam ||
      !caseProperty ||
      !underSection ||
      !actType ||
      !description ||
      !place ||
      !court
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
      */
    }
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
      ].some((field) => field?.trim() === "")
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const malkhana = await MalkhanaEntry.create({
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
      //   photoUrl,
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
      .json({ success: true, message: "Malkhana Entry found" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { createMalkhanaEntry };
