import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";  // Halaman untuk menambahkan buku
import LoanBook from "./components/LoanBook";  // Halaman untuk meminjam buku
import EditBook from "./components/EditBook";  // Halaman untuk mengedit buku

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/loan-book" element={<LoanBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/borrowers"element={<BorrowersList books={books} darkMode={darkMode} />} />
        <Route path="/returned" element={<ReturnedBooksList books={books} darkMode={darkMode} />} />
      </Routes>
    </Router>
  );
};

export default App;
