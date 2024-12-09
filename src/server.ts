import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";

const prisma = new PrismaClient();
const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

// Register book routes
app.use("/api/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});