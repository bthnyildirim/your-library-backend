import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";

// Set up Prisma client
const prisma = new PrismaClient();

// Set up Multer storage configuration to save images in 'uploads/' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name to prevent overwriting
  },
});

const upload = multer({ storage });

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
      console.log("Book not found for ID:", id);
      res.status(404).json({ message: "Book not found" });
      return;
    }

    console.log("Book found:", book);
    res.json(book);
  } catch (error) {
    console.error("Error fetching book with ID:", id, error);
    res.status(500).json({ message: "Error fetching the book" });
  }
};

// Create a new book with an image upload
export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Use multer middleware to handle file upload
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res
        .status(500)
        .json({ message: `Error uploading file: ${err.message}` });
    }

    const { title, author, rating, price } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const newBook = await prisma.book.create({
        data: {
          title,
          author,
          rating: rating ? parseFloat(rating) : null,
          price,
          imagePath,
        },
      });
      res.json(newBook);
    } catch (error) {
      res.status(500).json({ message: "Error creating book" });
    }
  });
};

// Update an existing book
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  // Use multer middleware for handling image upload
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res
        .status(500)
        .json({ message: `Error uploading file: ${err.message}` });
    }

    const { title, author, rating, price } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
      const updatedBook = await prisma.book.update({
        where: { id: Number(id) },
        data: {
          title,
          author,
          rating: rating ? parseFloat(rating) : null,
          price,
          imagePath: imagePath || undefined, // Only update image if a new one is provided
        },
      });

      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: "Error updating book" });
    }
  });
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
