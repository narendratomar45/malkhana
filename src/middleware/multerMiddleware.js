const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, "../../public/uploads");
    if (file.mimetype.includes("image")) {
      uploadPath = path.join(__dirname, "../../public/uploads/images");
    } else if (file.mimetype.includes("pdf")) {
      uploadPath = path.join(__dirname, "../../public/uploads/pdfs");
    } else if (
      file.mimetype.includes("spreadsheetml") ||
      file.mimetype.includes("excel")
    ) {
      uploadPath = path.join(__dirname, "../../public/uploads/excels");
    }
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type! Only images, PDFs, and Excel files are allowed."
      ),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;
