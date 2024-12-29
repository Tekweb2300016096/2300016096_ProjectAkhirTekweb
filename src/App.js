import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import BookDetail from "./components/BookDetail";
import EditBook from "./components/EditBook";
import LoanBook from "./components/LoanBook";
import BorrowersList from "./components/BorrowersList";
import ReturnedBooksList from "./components/ReturnedBooksList";

function App() {
  const [books, setBooks] = useState(() => {
    const books = localStorage.getItem("books");
    return books ? JSON.parse(books) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.body.classList.remove("bg-gray-900", "text-white");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const saveBooksToStorage = (updatedBooks) => {
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const addBook = (newBook) => {
    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    const updatedBooks = [...books, { ...newBook, id: newId, isBorrowed: false }];
    setBooks(updatedBooks);
    saveBooksToStorage(updatedBooks);
  };

  const deleteBook = (bookId) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    saveBooksToStorage(updatedBooks);
  };

  const updateBook = (updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    saveBooksToStorage(updatedBooks);
  };

  const toggleBorrowStatus = (bookId) => {
    const updatedBooks = books.map((book) => {
      const isReturning = book.id === bookId && book.isBorrowed;
      return book.id === bookId
        ? { ...book, isBorrowed: !book.isBorrowed, loanInfo: isReturning ? { ...book.loanInfo } : book.loanInfo }
        : book;
    });
    setBooks(updatedBooks);
    saveBooksToStorage(updatedBooks);
  };

  const loanBook = (bookId, loanInfo) => {
    const updatedBooks = books.map((book) =>
      book.id === bookId
        ? { ...book, isBorrowed: true, loanInfo: loanInfo }
        : book
    );
    setBooks(updatedBooks);
    saveBooksToStorage(updatedBooks);
  };

  return (
    <Router>
      <div className={`container mx-auto px-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <nav className={`p-4 rounded-md shadow-md ${darkMode ? "bg-gray-800" : "bg-orange-500"}`}>
          <ul className="flex justify-between items-center">
            <li className="flex space-x-6">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/add" className="hover:text-gray-300">Tambah Buku</Link>
              <Link to="/borrowers" className="hover:text-gray-300">Daftar Peminjam</Link>
              <Link to="/returned" className="hover:text-gray-300">Buku Dikembalikan</Link>
            </li>
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-md ${
                  darkMode ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<BookList books={books} deleteBook={deleteBook} toggleBorrowStatus={toggleBorrowStatus} isGridView={isGridView} setIsGridView={setIsGridView} />}
          />
          <Route
            path="/add"
            element={<AddBook addBook={addBook} />}
          />
          <Route
            path="/book/:id"
            element={<BookDetail books={books} toggleBorrowStatus={toggleBorrowStatus} />}
          />
          <Route
            path="/edit/:id"
            element={<EditBook books={books} updateBook={updateBook} />}
          />
          <Route
            path="/loan/:id"
            element={<LoanBook books={books} onLoanBook={loanBook} />}
          />
          <Route
            path="/borrowers"
            element={<BorrowersList books={books} />}
          />
          <Route
            path="/returned"
            element={<ReturnedBooksList books={books} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
