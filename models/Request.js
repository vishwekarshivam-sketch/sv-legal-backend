// models/Request.js
import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    formType: { type: String, default: "general" },
    mobile: { type: String, required: true },
    date: { type: String }, // store as ISO or human string based on your frontend
    document: { type: String }, // base64 or file URL
    notes: { type: String },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.models.Request || mongoose.model("Request", RequestSchema);
