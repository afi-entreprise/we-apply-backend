import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./db/db";
import router from "./routes/route";
import cors from "cors";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Connexion à la base de données
connectDB();

let alloweds = {
  origin: [process.env.ORIGIN_1, "http://localhost:5173"],
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || alloweds.origin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && alloweds.origin.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, Accept, Authorization",
  });
  next();
});

// Routes
app.use(router);

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
