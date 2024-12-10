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

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });

    res.json(book);
  } catch (error) {
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
