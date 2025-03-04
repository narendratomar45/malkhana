const MalkhanaOutMovement = require("../model/malkhanaMovement/malkhanaOutMovementModel");

const createMalkhnaMovement = async (req, res) => {
  try {
    const { entryType, firNo, takenOutBy, trackingBy, description } = req.body;
    if (!entryType || !firNo || !takenOutBy || !trackingBy || !description) {
      return res.status(400).json({ message: "All fields required" });
    }
    const malkhanaMovement = await MalkhanaOutMovement.create({
      entryType,
      firNo,
      takenOutBy,
      trackingBy,
      description,
    });
    return res
      .status(201)
      .json({ message: "Malkhna Movement is created", malkhanaMovement });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = createMalkhnaMovement;
