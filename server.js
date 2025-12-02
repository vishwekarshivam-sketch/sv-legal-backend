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
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error:", err.message));

// Routes
app.use("/requests", requestRoutes);
app.use("/upload", uploadRoutes);
app.use("/admin", adminRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend Active 🚀");
});

// Start server
app.listen(process.env.PORT || 8080, () => {
  console.log(`✔ Server Running on PORT ${process.env.PORT}`);
});
