const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// MongoDB URI with URL-encoded password and specified database name
const uri = "mongodb+srv://bookwormapp1:Programmer%401572@cluster0.c2fgrg6.mongodb.net/bookwormapp?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB with Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'bookwormapp' })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Book schema and model
const bookSchema = new mongoose.Schema({
  bookTitle: String,
  authorName: String,
  imageUrl: String,
  category: String,
  bookDescription: String,
  bookPdfUrl: String
});

const Book = mongoose.model('Book', bookSchema);

// Route to handle book uploads
app.post('/upload-book', async (req, res) => {
  try {
    const books = req.body.books;  // Extract books array from request body
    const savedBooks = await Book.insertMany(books);  // Insert multiple books at once
    res.status(201).send(savedBooks);  // Return the saved books
  } catch (error) {
    res.status(500).send({ error: 'Error saving the books' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

