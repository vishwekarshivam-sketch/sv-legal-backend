import express from "express";
import Request from "../models/Request.js";
import CallLog from "../models/CallLog.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// LOGIN (simple backend password check)
router.post("/login", (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        return res.json({ success: true });
    }

    return res.status(401).json({ success: false, message: "Invalid password" });
});

// DASHBOARD STATS
router.get("/stats", async (req, res) => {
    const totalRequests = await Request.countDocuments();
    const totalCalls = await CallLog.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    res.json({
        totalRequests,
        totalCalls,
        totalAppointments,
    });
});

// REQUESTS LIST
router.get("/requests", async (req, res) => {
    const data = await Request.find().sort({ date: -1 });
    res.json(data);
});

// CALLS LIST
router.get("/calls", async (req, res) => {
    const data = await CallLog.find().sort({ date: -1 });
    res.json(data);
});

// APPOINTMENTS LIST
router.get("/appointments", async (req, res) => {
    const data = await Appointment.find().sort({ date: -1 });
    res.json(data);
});

export default router;
