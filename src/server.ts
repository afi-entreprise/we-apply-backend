import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import authRoutes from "./routes/auth";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
