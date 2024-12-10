import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/booksController";

const router = express.Router();

// Routes for books
router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export { router as booksRoutes };
