const path = require("path");
const uploadOnCloudinary = require("../utilities/cloudinary");
const Image = require("../model/imageModel");
const uploadImage = async (req, res) => {
  try {
    const { tags, category } = req.body;
    const localPath = path.resolve(req.files.document[0].path);
    if (!localPath) {
      return res.status(400).json({ message: "document upload failed" });
    }

    const documentFile = await uploadOnCloudinary(localPath);
    if (!documentFile || !documentFile.url) {
      return res.status(400).json({ message: "document upload failed" });
    }
    const newImage = await Image({
      document: documentFile.url,
      tags: tags ? tags.split(",") : [],
      category,
    });
    await newImage.save();
    res.status(201).json({
      message: "Image uploaded successfully",
      uploadedImage: newImage,
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const relatedImage = async (req, res) => {
  try {
    const { tags, category } = req.body;
    const localPath = path.resolve(req.file.path);
    if (!localPath) {
      return res.status(400).json({ message: "document upload failed" });
    }

    const documentFile = await uploadOnCloudinary(localPath);
    if (!documentFile || !documentFile.url) {
      return res.status(400).json({ message: "document upload failed" });
    }

    // Save new uploaded image
    const newImage = await Image({
      document: documentFile.url,
      tags: tags ? tags.split(",") : [],
      category,
    });
    await newImage.save();

    // **Fetch related images from MongoDB**
    const relatedImages = await Image.find({
      $or: [
        { category: category }, // Match by category
        { tags: { $in: tags ? tags.split(",") : [] } }, // Match by any tag
      ],
      _id: { $ne: newImage._id }, // Exclude the uploaded image
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      uploadedImage: newImage,
      relatedImages, // Send related images
    });
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { uploadImage, relatedImage };
