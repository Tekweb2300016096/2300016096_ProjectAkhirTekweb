import React from "react";
import { useParams } from "react-router-dom";

const BookDetail = ({ books }) => {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <p>Buku tidak ditemukan!</p>;
  }

  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-center mb-4">{book.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-medium text-gray-700">Penulis: {book.author}</p>
        <p className="text-lg font-medium text-gray-700">Tahun Terbit: {book.year}</p>
        <p className="text-lg font-medium text-gray-700">Jumlah Halaman: {book.pages}</p>
        <p className="text-lg font-medium text-gray-700">Review:</p>
        <p className="text-gray-600">{book.review}</p>
      </div>
    </div>
  );
};

export default BookDetail;
