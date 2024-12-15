const express = require("express");
const multer = require("multer");
const File = require("../models/File");
const auth = require("../middleware/auth");

const router = express.Router();

const storage = require('../utils/storage')
const upload = multer({ storage });
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  const file = new File({
    name: req.file.originalname,
    path: req.file.path,
    userId: req.user.id,
  });

  await file.save();
  res.status(201).json(file);
});

router.get("/", auth, async (req, res) => {
  const files = await File.find({ userId: req.user.id });
  res.json(files);
});

router.get("/download/:id", auth, async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ message: "File not found" });

  res.download(file.path, file.name);
});

module.exports = router;
