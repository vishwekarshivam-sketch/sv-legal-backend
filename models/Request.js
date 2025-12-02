import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
    name: String,
    formType: String,
    mobile: String,
    date: String,
    document: String, // Base64 or URL
    notes: String
},{
    timestamps:true
});

export default mongoose.model("Request", RequestSchema);
status: { type: String, default: "pending" }
