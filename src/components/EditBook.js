import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = ({ books, updateBook, darkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookToEdit = books.find((book) => book.id === parseInt(id)) || {};

  const [title, setTitle] = useState(bookToEdit.title || "");
  const [author, setAuthor] = useState(bookToEdit.author || "");
  const [genres, setGenres] = useState(bookToEdit.genres || []); // Multi-genre sebagai array
  const [year, setYear] = useState(bookToEdit.year || "");
  const [pages, setPages] = useState(bookToEdit.pages || "");
  const [review, setReview] = useState(bookToEdit.review || "");
  const [image, setImage] = useState(bookToEdit.image || "");

  const allGenres = ["Action", "Fantasy", "Adventure", "Drama", "Romance", "Horror", "Comedy", "Magic", "Seinen", "Scholl Life", "Sport", "Martial Arts", "Dark"];

  const handleGenreChange = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre)); // Hapus genre jika sudah dipilih
    } else {
      setGenres([...genres, genre]); // Tambahkan genre jika belum dipilih
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookToEdit.id) {
      alert("Buku tidak ditemukan!");
      return;
    }
    const updatedBook = {
      ...bookToEdit,
      title,
      author,
      genres: genres.map((g) => g.trim().toLowerCase()), // Normalisasi genre
      year,
      pages,
      review,
      image,
    };
    updateBook(updatedBook);
    navigate("/");
  };

  return (
    <div
      className={`my-6 p-6 rounded-lg shadow-lg max-w-lg mx-auto ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Edit Buku</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Judul Buku</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Penulis</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Genre</label>
          <div className="grid grid-cols-2 gap-2">
            {allGenres.map((genre) => (
              <label key={genre} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={genre.toLowerCase()}
                  checked={genres.includes(genre.toLowerCase())}
                  onChange={() => handleGenreChange(genre.toLowerCase())}
                  className="form-checkbox"
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Tahun Terbit</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Jumlah Halaman</label>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Deskripsi</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">URL Gambar</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border-2 rounded-md focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditBook;