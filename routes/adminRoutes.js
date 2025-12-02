// routes/adminRoutes.js
import express from "express";
import Request from "../models/Request.js";
import Appointment from "../models/Appointment.js";
import CallLog from "../models/CallLog.js";

const router = express.Router();

/*
  NOTE: This is a tiny admin API. For production, add authentication (JWT/sessions).
*/

// simple admin login check (placeholder): POST { password: "..." }
// Replace with a secure admin password check or OAuth.
router.post("/login", (req, res) => {
  const pass = req.body?.password;
  const ADMIN_PASS = process.env.ADMIN_PASS || "admin-default-pass"; // set in env
  if (pass === ADMIN_PASS) return res.json({ ok: true });
  return res.status(401).json({ ok: false });
});

// fetch dashboard counts
router.get("/dashboard", async (req, res) => {
  try {
    const reqCount = await Request.countDocuments();
    const apptCount = await Appointment.countDocuments();
    const callCount = await CallLog.countDocuments();
    res.json({ requests: reqCount, appointments: apptCount, calls: callCount });
  } catch (err) {
    console.error("adminRoutes dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// fetch requests list (admin)
router.get("/requests", async (req, res) => {
  try {
    const items = await Request.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error("adminRoutes requests error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// appointments: create/list
router.post("/appointments", async (req, res) => {
  try {
    const a = new Appointment(req.body);
    const saved = await a.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("adminRoutes appointments POST error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/appointments", async (req, res) => {
  try {
    const items = await Appointment.find().sort({ datetime: -1 });
    res.json(items);
  } catch (err) {
    console.error("adminRoutes appointments GET error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// call logs
router.post("/calls", async (req, res) => {
  try {
    const c = new CallLog(req.body);
    const saved = await c.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("adminRoutes calls POST error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/calls", async (req, res) => {
  try {
    const items = await CallLog.find().sort({ timestamp: -1 });
    res.json(items);
  } catch (err) {
    console.error("adminRoutes calls GET error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
