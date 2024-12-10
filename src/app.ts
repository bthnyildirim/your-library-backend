import express, { Application } from "express";
import cors from "cors";
import { booksRoutes } from "./routes/booksRoutes";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", booksRoutes);
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
