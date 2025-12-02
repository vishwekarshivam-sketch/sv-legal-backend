import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Request", RequestSchema);
