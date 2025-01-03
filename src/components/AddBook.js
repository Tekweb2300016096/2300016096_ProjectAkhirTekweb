import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = ({ addBook, darkMode }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState([]); // Multi-genre sebagai array
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [review, setReview] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  // Daftar genre yang tersedia
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
    if (title && author && genres.length > 0 && year && pages && review && image) {
      addBook({
        title,
        author,
        genres: genres.map((g) => g.trim().toLowerCase()), // Normalisasi genre
        year,
        pages,
        review,
        image,
      });
      navigate("/");
    } else {
      alert("Semua field harus diisi, dan minimal satu genre harus dipilih!");
    }
  };

  return (
    <div
      className={`my-6 p-6 rounded-lg shadow-lg max-w-lg mx-auto ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Tambah Buku Baru</h1>
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
          Tambah Buku
        </button>
      </form>
    </div>
  );
};

export default AddBook;