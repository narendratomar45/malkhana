const mongoose = require("mongoose");
const connectDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/malkhanaManagementSystem");
};
module.exports = connectDb;
