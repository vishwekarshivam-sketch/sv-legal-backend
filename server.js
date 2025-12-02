import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import requestRoutes from "./routes/requestRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/requests", requestRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend Active 🚀");
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on PORT ${process.env.PORT}`)
);
