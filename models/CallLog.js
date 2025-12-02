// models/CallLog.js
import mongoose from "mongoose";

const CallLogSchema = new mongoose.Schema(
  {
    callerName: { type: String },
    phone: { type: String },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
    assignedTo: { type: String },
  },
  { versionKey: false }
);

export default mongoose.models.CallLog || mongoose.model("CallLog", CallLogSchema);
