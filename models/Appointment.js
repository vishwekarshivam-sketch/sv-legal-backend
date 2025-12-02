import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Appointment", AppointmentSchema);
