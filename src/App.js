import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import BookDetail from "./components/BookDetail";

function App() {
  const getBooksFromStorage = () => {
    const books = localStorage.getItem("books");
    return books ? JSON.parse(books) : [];
  };

  const [books, setBooks] = useState(getBooksFromStorage);

  const saveBooksToStorage = (updatedBooks) => {
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const addBook = (newBook) => {
    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    const updatedBooks = [...books, { ...newBook, id: newId }];
    setBooks(updatedBooks);
    saveBooksToStorage(updatedBooks);
  };

  const deleteBook = (bookId) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    saveBooksToStorage(updatedBooks);
  };

  return (
    <Router>
      <div className="container mx-auto px-4">
        {/* Navigasi */}
        <nav className="bg-orange-500 p-4 rounded-md shadow-md">
          <ul className="flex space-x-6 text-white">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/add" className="hover:text-gray-300">Add Book</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<BookList books={books} deleteBook={deleteBook} />} />
          <Route path="/add" element={<AddBook addBook={addBook} />} />
          <Route path="/book/:id" element={<BookDetail books={books} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
