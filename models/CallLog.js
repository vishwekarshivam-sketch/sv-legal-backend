import mongoose from "mongoose";

const CallLogSchema = new mongoose.Schema({
  name: String,
  phone: String,
  time: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("CallLog", CallLogSchema);
