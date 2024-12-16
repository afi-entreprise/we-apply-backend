import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import router from "./routes/auth";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use(router);

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
