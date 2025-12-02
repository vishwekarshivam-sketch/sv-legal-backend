import express from "express";
import CallLog from "../models/CallLog.js";
import Appointment from "../models/Appointment.js";
import Request from "../models/Request.js";

const router = express.Router();

// admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "svlegal" && password === "admin123") {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

// all data fetch
router.get("/dashboard", async (req, res) => {
  const requests = await Request.find();
  const calls = await CallLog.find();
  const appointments = await Appointment.find();

  res.json({ requests, calls, appointments });
});

export default router;
