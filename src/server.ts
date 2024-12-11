import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { booksRoutes } from "./routes/booksRoutes";
import path from "path";

const prisma = new PrismaClient();
const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

// Register book routes
app.use("/api/books", booksRoutes);

// Serve static files for image uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
