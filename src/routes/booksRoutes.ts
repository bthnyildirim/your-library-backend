// src/routes/booksRoutes.ts

import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/booksController";

const router = express.Router();

router.get("/books", getBooks);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export { router as bookRoutes }; // Named export
