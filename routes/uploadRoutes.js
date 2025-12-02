// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "uploads");

// ensure uploads folder exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, safeName);
  },
});
const upload = multer({ storage });

// single file endpoint
router.post("/file", upload.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const urlPath = `/uploads/${req.file.filename}`;
    res.json({ filename: req.file.filename, url: urlPath });
  } catch (err) {
    console.error("uploadRoutes /file error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// multiple files (optional)
router.post("/files", upload.array("files", 6), (req, res) => {
  try {
    const files = (req.files || []).map((f) => ({ filename: f.filename, url: `/uploads/${f.filename}` }));
    res.json({ files });
  } catch (err) {
    console.error("uploadRoutes /files error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
