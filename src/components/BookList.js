import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookList = ({ books, deleteBook, toggleBorrowStatus, isGridView, setIsGridView }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian judul
  const [searchGenre, setSearchGenre] = useState(""); // State untuk pencarian genre

  const genres = ["Action", "Fantasy", "Adventure", "Drama", "Romance", "Horror", "Comedy", "Magic", "Seinen", "School Life", "Sport", "Martial Arts", "Dark"];

  // Filter buku berdasarkan pencarian judul dan genre
  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      searchGenre === "" || 
      (book.genres && book.genres.some((g) => g.toLowerCase() === searchGenre.toLowerCase()));
    return matchesTitle && matchesGenre;
  });

  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-center mb-6">Daftar Buku</h1>

      {/* Input untuk Pencarian */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 sm:mb-0 sm:mr-4 px-4 py-2 border rounded-md w-full sm:w-1/2"
        />

        <select
          value={searchGenre}
          onChange={(e) => setSearchGenre(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/4"
        >
          <option value="">Semua Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre.toLowerCase()}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Tombol Toggle Tampilan */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsGridView(true)}
          className={`px-4 py-2 mr-2 rounded-md ${
            isGridView ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`px-4 py-2 rounded-md ${
            !isGridView ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          List View
        </button>
      </div>

      {/* Daftar Buku */}
      <div
        className={
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col space-y-4"
        }
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden flex ${
                isGridView ? "flex-col" : "flex-row items-center"
              } transform transition-transform hover:scale-105 hover:shadow-2xl`}
            >
         <div
  className={`bg-gray-200 relative overflow-hidden ${
    isGridView ? "w-full aspect-[3/4]" : "w-full aspect-[3/4]"
  } flex items-center justify-center`}
>
  <img
    src={book.image || "https://via.placeholder.com/150"}
    alt={book.title}
    className="object-cover w-full h-full"
  />
</div>

              <div
                className={`p-4 ${isGridView ? "flex-grow" : "flex flex-col flex-grow"}`}
              >
                <h2
                  className={`${
                    isGridView
                      ? "text-xl font-semibold text-orange-500 mb-2"
                      : "text-4xl font-bold text-orange-500 mb-2"
                  }`}
                >
                  {book.title}
                </h2>
                <p className="text-gray-600 mb-1">Penulis: {book.author}</p>
                <p className="text-gray-600 mb-1">
                  Genre: {book.genres ? book.genres.join(", ") : book.genre}
                </p>

                {/* Tampilkan Tahun di Grid View */}
                {isGridView && <p className="text-gray-600 mb-4">Tahun: {book.year}</p>}

                {/* Tampilkan Deskripsi di List View */}
                {!isGridView && <p className="text-gray-600 mb-4">Deskripsi: {book.review}</p>}

                <p
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-md mb-4 ${
                    book.isBorrowed
                      ? "bg-red-100 text-red-500"
                      : "bg-green-100 text-green-500"
                  }`}
                >
                  {book.isBorrowed ? "Dipinjam" : "Tersedia"}
                </p>

                <div
                  className={`mt-auto flex ${
                    isGridView ? "justify-between" : "justify-start space-x-4"
                  }`}
                >
                  <Link
                    to={`/book/${book.id}`}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Lihat Detail
                  </Link>

                  <Link
                    to={`/edit/${book.id}`}
                    className="text-sm text-green-500 hover:text-green-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteBook(book.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Hapus
                  </button>

                  {!book.isBorrowed && (
                    <Link
                      to={`/loan/${book.id}`}
                      className="text-sm text-blue-500 hover:text-blue-700"
                    >
                      Pinjam Buku
                    </Link>
                  )}

                  {book.isBorrowed && (
                    <button
                      onClick={() => toggleBorrowStatus(book.id)}
                      className="text-sm text-yellow-500 hover:text-yellow-700"
                    >
                      Kembalikan Buku
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Buku tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
