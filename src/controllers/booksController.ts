// src/controllers/booksController.ts
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all books
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Get a single book by id
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  console.log("Received ID:", id); // Log for debugging
  if (isNaN(Number(id))) {
    console.log("Invalid ID format:", id);
    res.status(400).json({ message: "Invalid ID format" });
    return;
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) }, // Convert the ID to a number
    });

    if (!book) {
      console.log("Book not found for ID:", id); // Log if no book is found
      res.status(404).json({ message: "Book not found" });
      return;
    }

    console.log("Book found:", book); // Log the retrieved book data
    res.json(book);
  } catch (error) {
    console.error("Error fetching book with ID:", id, error); // Log detailed error
    res.status(500).json({ message: "Error fetching the book" });
  }
};

// Create a new book
export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, author } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: { title, author },
    });
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
  }
};

// Update an existing book
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, author } = req.body;

  try {
    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: { title, author },
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

// Delete a book
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.book.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};
