import express, { Application } from "express";
import cors from "cors";
import { bookRoutes } from "./routes/booksRoutes";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

export default app;
