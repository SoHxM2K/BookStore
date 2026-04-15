import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import {Book} from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("<h1> hello world!! </h1>");
});

app.post("/books", async (req, res) => {
    try {
        const {title, author, PublishYear} = req.body;

        if(!title || !author || !PublishYear) {
            return res.status(400).json({message: "All fields are required!!"});
        }

        const newBook = await Book.create({title, author, PublishYear});

        res.status(201).json({message: "Book created successfully!!", book: newBook});


    } catch(error){
        
        res.status(500).json({message: "Eror creating book!!"});
    }
});


app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            count: books.length,
            books
        });
    } catch(error) {
        res.status(500).json({message: "Error fetching books!!"});
    }
});

app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) {
            return res.status(404).json({message: "Book not found!!"});
        }
        res.status(200).json({book});
    } catch(error) {
        res.status(500).json({message: "Error fetching book!!"});
    }
});

app.put("/books/:id", async (req, res) => {

    const {id} = req.params;
    try {
        const {title, author, PublishYear} = req.body;


        const updatedBook = await Book.findByIdAndUpdate(id, {title, author, PublishYear});

        res.status(200).json({message: "Book updated successfully!!", book: updatedBook});

    } catch(error) {
        res.status(500).json({message: "Error updating book!!"});
    }
});

app.delete("/books/:id", async (req, res) => {

    const {id} = req.params;
    try {

        await Book.findByIdAndDelete(id);
        res.status(200).json({message: "Book deleted successfully!!"});
    }
    catch(error) {  
        res.status(500).json({message: "Error deleting book!!"});
    }
});






connectDB(app);




