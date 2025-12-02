import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: { type: String, enum: ["office", "call", "zoom"], default: "office" },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Appointment", AppointmentSchema);
