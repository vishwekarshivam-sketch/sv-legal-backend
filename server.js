// server.js (ESM)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import requestRoutes from "./routes/requestRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// Middleware
// For now allow all origins (fine for testing). In production, replace with specific origin(s).
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// MongoDB Connect
const MONGO_URI = process.env.MONGO_URI || process.env.DB_URI || "";
if (!MONGO_URI) {
  console.warn("⚠️  MONGO_URI is not set. Set it in your environment (.env / Railway env vars).");
}
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err && err.message ? err.message : err));

// Routes - logical mounts
// requestRoutes handles endpoints related to user requests (mounted at /requests)
app.use("/requests", requestRoutes);

// uploadRoutes handles file uploads. See note below about router path (should be "/" inside uploadRoutes).
// This makes the final endpoint POST /upload (recommended).
app.use("/upload", uploadRoutes);

// adminRoutes covers /admin/* (login, stats, lists)
app.use("/admin", adminRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend Active 🚀");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✔ Server Running on PORT ${PORT}`);
});
