import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookDetail = ({ books, toggleBorrowStatus }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <p>Buku tidak ditemukan!</p>;
  }

  const handleBorrowClick = () => {
    if (!book.isBorrowed) {
      navigate(`/loan/${book.id}`);
    } else {
      toggleBorrowStatus(book.id);
      navigate("/");
    }
  };

  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-center mb-4">{book.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-medium text-gray-700">Penulis: {book.author}</p>
        <p className="text-lg font-medium text-gray-700">
          Genre: {book.genres ? book.genres.join(", ") : book.genre}
        </p>
        <p className="text-lg font-medium text-gray-700">Tahun Terbit: {book.year}</p>
        <p className="text-lg font-medium text-gray-700">Jumlah Halaman: {book.pages}</p>
        <p className="text-lg font-medium text-gray-700">Deskripsi:</p>
        <p className="text-gray-600 mb-4">{book.review}</p>

        {book.isBorrowed && book.loanInfo && (
          <div className="mt-4">
            <p className="text-lg text-gray-700">
              <strong>Peminjam:</strong> {book.loanInfo.borrowerName}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Tanggal Pinjam:</strong> {book.loanInfo.loanDate}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Tanggal Kembali:</strong> {book.loanInfo.dueDate}
            </p>
          </div>
        )}

        <button
          onClick={handleBorrowClick}
          className={`w-full ${book.isBorrowed ? "bg-red-500" : "bg-blue-500"} text-white p-3 rounded-md`}
        >
          {book.isBorrowed ? "Kembalikan Buku" : "Pinjam Buku"}
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600"
        >
          Kembali ke Daftar Buku
        </button>
      </div>
    </div>
  );
};

export default BookDetail;