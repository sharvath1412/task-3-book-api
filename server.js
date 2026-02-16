const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

app.get("/", (req, res) => {
  res.status("Boks API running");
});


app.get("/books/:id", (req, res) => {
    res.json([
        {id: 1, tittle: "Atomic Habits", author: "James Clear"}
    ]);
   });


// ================= ADD NEW BOOK =================
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});


// ================= UPDATE BOOK =================
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[bookIndex] = {
    id,
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author
  };

  res.status(200).json({
    message: "Book updated successfully",
    book: books[bookIndex]
  });
});


// ================= DELETE BOOK =================
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const exists = books.some(b => b.id === id);

  if (!exists) {
    return res.status(404).json({ message: "Book not found" });
  }

  books = books.filter(b => b.id !== id);

  res.status(200).json({
    message: "Book deleted successfully"
  });
});


// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
