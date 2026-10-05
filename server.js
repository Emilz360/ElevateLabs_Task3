const express = require("express");

const app = express();
const PORT = 3000;

// Allows Express to read JSON request bodies.
app.use(express.json());

// In-memory storage: no database is needed for this task.
let books = [
  { id: 1, title: "Things Fall Apart", author: "Chinua Achebe" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "The Alchemist", author: "Paulo Coelho" }
];

let nextId = 4;

app.get("/", (req, res) => {
  res.json({
    message: "Books REST API is running",
    endpoints: ["GET /books", "POST /books", "PUT /books/:id", "DELETE /books/:id"]
  });
});

// GET /books - return all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET /books/:id - return one book
app.get("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(book => book.id === id);

  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST /books - add a book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Both title and author are required" });
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update a book
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(book => book.id === id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Both title and author are required" });
  }

  book.title = title.trim();
  book.author = author.trim();
  res.json(book);
});

// DELETE /books/:id - remove a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index === -1) return res.status(404).json({ error: "Book not found" });

  const deletedBook = books.splice(index, 1)[0];
  res.json({ message: "Book deleted successfully", book: deletedBook });
});

app.listen(PORT, () => {
  console.log(`Books REST API running at http://localhost:${PORT}`);
});
