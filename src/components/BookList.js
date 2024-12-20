import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books, deleteBook }) => {
  // Fungsi untuk konfirmasi penghapusan buku
  const handleDelete = (bookId) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (isConfirmed) {
      deleteBook(bookId);
    }
  };

  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-center mb-4">Daftar Buku</h1>
      <ul className="space-y-4">
        {books.map((book) => (
          <li
            key={book.id}
            className="flex flex-col space-y-2 bg-white p-4 rounded-lg shadow-lg"
          >
            {/* Link ke halaman detail buku */}
            <Link
              to={`/book/${book.id}`}
              className="text-xl font-semibold text-orange-500 hover:text-orange-600"
            >
              {book.title}
            </Link>
            <p className="text-gray-600">Penulis: {book.author}</p>
            <div className="flex justify-between items-center">
              {/* Tombol hapus buku dengan konfirmasi */}
              <button
                onClick={() => handleDelete(book.id)} // Menggunakan handleDelete dengan konfirmasi
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Hapus
              </button>
              {/* Link ke halaman detail buku */}
              <Link
                to={`/book/${book.id}`}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Lihat Detail
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
