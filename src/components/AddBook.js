import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = ({ addBook }) => {
  // State untuk menyimpan input dari pengguna
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && year && pages && review) {
      addBook({ title, author, year, pages, review });
      navigate("/"); // Kembali ke halaman utama setelah menambah buku
    }
  };

  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-center mb-4">Tambah Buku Baru</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Judul Buku */}
        <div className="mb-4">
          <label className="block text-lg font-medium">Judul Buku</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Penulis */}
        <div className="mb-4">
          <label className="block text-lg font-medium">Penulis</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Tahun Terbit */}
        <div className="mb-4">
          <label className="block text-lg font-medium">Tahun Terbit</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Jumlah Halaman */}
        <div className="mb-4">
          <label className="block text-lg font-medium">Jumlah Halaman</label>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Review */}
        <div className="mb-4">
          <label className="block text-lg font-medium">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600"
        >
          Tambah Buku
        </button>
      </form>
    </div>
  );
};

export default AddBook;
