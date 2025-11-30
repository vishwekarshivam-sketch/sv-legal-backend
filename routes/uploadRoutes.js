import express from "express";
import multer from "multer";
import path from "path";
import { Request } from "../models/Request.js";

const router = express.Router();

// Storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post("/upload", upload.single("document"), async (req, res) => {
    const newReq = new Request({
        ...req.body,
        documentPath: req.file?.filename || null
    });

    await newReq.save();
    res.json({ success: true, file: req.file.filename });
});

export default router;
