const SummonEntry = require("../model/summonEntryModel.js");

const createSummonEntry = async (req, res) => {
  try {
    const {
      entryType,
      firOrGdNumber,
      policeStation,
      vehicleOwner,
      fatherName,
      address,
      vehicleRegistrationNumber,
      place,
      lastDays,
      releaseDays,
      actType,
      date,
      time,
    } = req.body;

    const newEntry = new SummonEntry({
      entryType,
      firOrGdNumber,
      policeStation,
      vehicleOwner,
      fatherName,
      address,
      vehicleRegistrationNumber,
      place,
      lastDays,
      releaseDays,
      actType,
      date,
      time,
    });
    await newEntry.save();
    return res
      .status(201)
      .json({ message: "Summon Entry created successfully", data: newEntry });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const getSummonEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Summon Id not found" });
    }
    const summonEntry = await SummonEntry.findById(id);
    if (!summonEntry) {
      return res.status(404).json({ message: "Summon entry not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Summon entry found Successfully",
      summonEntry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const getAllSummonEntry = async (req, res) => {
  try {
    const allSummonEntry = await SummonEntry.find();
    return res
      .status(200)
      .json({ message: "All summon entry found", allSummonEntry });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const updateSummonEntry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Summon ID is required" });
    }
    const {
      entryType,
      firOrGdNumber,
      policeStation,
      vehicleOwner,
      fatherName,
      address,
      vehicleRegistrationNumber,
      place,
      lastDays,
      releaseDays,
      actType,
      date,
      time,
    } = req.body;
    const updatedSummon = await SummonEntry.findByIdAndUpdate(
      id,
      {
        entryType,
        firOrGdNumber,
        policeStation,
        vehicleOwner,
        fatherName,
        address,
        vehicleRegistrationNumber,
        place,
        lastDays,
        releaseDays,
        actType,
        date,
        time,
      },
      { new: true }
    );
    if (!updatedSummon) {
      return res.status(404).json({ message: "Summon entry not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Summon entry updated successfully",
      updatedSummon,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
const deleteSummonEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Summon ID is required" });
    }
    const deleteSummon = await SummonEntry.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Summon Entry deleted Successfully",
      deleteSummon,
    });
  } catch (error) {}
};
module.exports = {
  createSummonEntry,
  getSummonEntry,
  getAllSummonEntry,
  updateSummonEntry,
  deleteSummonEntry,
};
