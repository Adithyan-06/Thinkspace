import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({origin:"https://thinkspace-three.vercel.app",credentials: true}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("Server started on PORT:", PORT);
    });
  });

