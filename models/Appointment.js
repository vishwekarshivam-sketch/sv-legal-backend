// models/Appointment.js
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    phone: { type: String },
    datetime: { type: Date, required: true },
    purpose: { type: String },
    notes: { type: String },
    status: { type: String, default: "scheduled" }, // scheduled, completed, cancelled
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
