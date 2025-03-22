const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
  {
    document: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, required: true },
  },
  { timeStamps: true }
);
const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
