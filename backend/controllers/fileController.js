const File = require("../models/File");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: "uploads/" });

exports.uploadFile = async (req, res) => {
  try {
    const validTypes = ["pptx", "docx", "xlsx"];
    const fileType = path.extname(req.file.originalname).slice(1);

    if (!validTypes.includes(fileType)) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    const file = await File.create({
      name: req.file.originalname,
      path: req.file.path,
      uploadedBy: req.user.id,
    });

    res.json({ message: "File uploaded successfully", file });
  } catch (error) {
    res.status(400).json({ message: "File upload failed", error });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const files = await File.find().select("name");
    res.json(files);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch files", error });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.download(file.path, file.name);
  } catch (error) {
    res.status(400).json({ message: "Failed to download file", error });
  }
};
