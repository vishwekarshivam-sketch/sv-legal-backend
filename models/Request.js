import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  formType: { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: String, required: true },
  document: { type: String },
  notes: { type: String },

  // THIS was causing the error — now fixed
  status: { type: String, default: "pending" }
});

export default mongoose.model("Request", RequestSchema);
