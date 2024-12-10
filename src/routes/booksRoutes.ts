import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/booksController";

const router = express.Router();

router.get("/", getBooks); // GET /api/books
router.post("/", createBook); // POST /api/books
router.put("/:id", updateBook); // PUT /api/books/:id
router.delete("/:id", deleteBook); // DELETE /api/books/:id

export { router as booksRoutes }; // Named export
