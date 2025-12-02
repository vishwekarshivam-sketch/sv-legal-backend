import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

export default router;
