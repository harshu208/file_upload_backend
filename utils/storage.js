
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userFolder = path.join(__dirname, "../uploads", req.user.id.toString());
    fs.exists(userFolder, (exists) => {
      if (!exists) {
        fs.mkdirSync(userFolder, { recursive: true });
      }
      cb(null, userFolder);
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

module.exports = storage;
