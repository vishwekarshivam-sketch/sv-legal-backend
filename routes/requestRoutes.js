// routes/requestRoutes.js
import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// create a new request
router.post("/", async (req, res) => {
  try {
    const reqBody = req.body;
    const r = new Request(reqBody);
    const saved = await r.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("requestRoutes POST error:", err);
    res.status(500).json({ error: "Server error creating request" });
  }
});

// list requests
router.get("/", async (req, res) => {
  try {
    const items = await Request.find().sort({ createdAt: -1 }).limit(200);
    res.json(items);
  } catch (err) {
    console.error("requestRoutes GET error:", err);
    res.status(500).json({ error: "Server error fetching requests" });
  }
});

// update request (status or notes)
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error("requestRoutes PATCH error:", err);
    res.status(500).json({ error: "Server error updating request" });
  }
});

// delete request
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Request.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error("requestRoutes DELETE error:", err);
    res.status(500).json({ error: "Server error deleting request" });
  }
});

export default router;
