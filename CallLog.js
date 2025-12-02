import mongoose from "mongoose";

const CallLogSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    name: { type: String },
    callType: { type: String, enum: ["incoming", "outgoing", "missed"], default: "incoming" },
    notes: { type: String },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("CallLog", CallLogSchema);
