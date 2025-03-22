const profile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      message: "User profile found successfully",
      user,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "INternal Server Error" });
  }
};
module.exports = { profile };
