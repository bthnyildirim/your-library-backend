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

export default app;
