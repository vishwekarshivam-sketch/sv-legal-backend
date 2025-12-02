// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// route imports
import requestRoutes from "./routes/requestRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// serve uploads as static so frontend can access uploaded files if needed
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mongo connection (build connection string from env variables)
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

if (!DB_USER || !DB_PASS || !DB_NAME) {
  console.error("Missing DB env vars. Set DB_USER, DB_PASS, DB_NAME.");
  process.exit(1);
}

const uri = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(
  DB_PASS
)}@cluster0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Register routes
app.use("/api/requests", requestRoutes); // e.g. POST /api/requests
app.use("/api/upload", uploadRoutes); // file upload endpoints
app.use("/api/admin", adminRoutes); // admin endpoints (auth-lite if needed)

// health check
app.get("/", (req, res) => res.send("Backend Active 🚀"));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on PORT ${PORT}`);
});
