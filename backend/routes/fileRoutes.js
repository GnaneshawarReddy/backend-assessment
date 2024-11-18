const express = require("express");
const { uploadFile, listFiles, downloadFile } = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddileware");

const router = express.Router();

router.post("/upload", authMiddleware("ops"), upload.single("file"), uploadFile);
router.get("/files", authMiddleware("client"), listFiles);
router.get("/download/:fileId", authMiddleware("client"), downloadFile);

module.exports = router;
