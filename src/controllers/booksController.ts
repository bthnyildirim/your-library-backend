import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all books (Anyone can view the books)
export const getBooks = async (req: Request, res: Response) => {
  try {
    // Fetch all books
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Create a new book (Anyone can create a book)
export const createBook = async (req: Request, res: Response) => {
  const { title, author } = req.body;

  try {
    // Create new book
    const newBook = await prisma.book.create({
      data: { title, author },
    });
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
  }
};

// Update an existing book (Anyone can update a book)
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;

  try {
    // Update book
    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: { title, author },
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

// Delete a book (Anyone can delete a book)
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Delete book
    await prisma.book.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};
