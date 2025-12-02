import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  name: String,
  formType: String,
  mobile: String,
  date: String,
  document: String, 
  notes: String,
  status: { type: String, default: "pending" }  // <-- This is valid
});

export default mongoose.model("Request", RequestSchema);
