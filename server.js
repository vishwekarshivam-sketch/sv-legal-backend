import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import requestRoutes from "./routes/requestRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Construct connection string safely (NO formatting error possible now)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.4qe3rqr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster`;

mongoose.connect(uri)
    .then(() => console.log("🟢 MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err.message));

app.use("/admin/requests", requestRoutes);

app.get("/", (req,res)=> res.send("Backend Active 🚀"));

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server Running on PORT ${process.env.PORT}`);
});
