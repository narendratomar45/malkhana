const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dy7ii8rkd",
  api_key: "651896926843797",
  api_secret: "qKzbWUTWrx2sUQmrMVCQ9TtMi9k",
});
module.exports = cloudinary;

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
module.exports = uploadOnCloudinary;
