import express from "express";
import "dotenv/config";
import cors from "cors";

import connectDB from "./config/db.js";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello world!!!</h1>");
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = await Book.create({ title, author, publishYear });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book", error });
  }
});

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { title, author, publishYear } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: "Error updating book", error });
  }
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Book.findByIdAndDelete(id);

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting book", error });
  }
});

connectDB(app);