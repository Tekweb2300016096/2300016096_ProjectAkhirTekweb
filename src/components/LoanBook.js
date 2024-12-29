import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LoanBook = ({ books, onLoanBook }) => {
  const { id } = useParams(); // Mengambil 'id' dari URL
  const navigate = useNavigate();
  
  const book = books.find((book) => book.id === parseInt(id));

  const [borrowerName, setBorrowerName] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!book) {
      navigate("/"); // Jika buku tidak ditemukan, arahkan kembali ke halaman utama
    }
  }, [book, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (borrowerName && loanDate && dueDate) {
      // Membuat objek peminjaman
      const loanInfo = {
        borrowerName,
        loanDate,
        dueDate,
      };

      // Panggil fungsi untuk menyimpan informasi peminjaman dan perbarui status buku
      onLoanBook(book.id, loanInfo);

      // Arahkan kembali ke halaman utama setelah berhasil
      navigate("/");
    } else {
      alert("Semua field harus diisi!");
    }
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-6">
      <h1 className="text-3xl font-bold text-center mb-4">Pinjam Buku</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">{book.title}</h2>
        <form onSubmit={handleSubmit}>
          {/* Nama Peminjam */}
          <div className="mb-4">
            <label className="block text-lg font-medium">Nama Peminjam</label>
            <input
              type="text"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Tanggal Peminjaman */}
          <div className="mb-4">
            <label className="block text-lg font-medium">Tanggal Peminjaman</label>
            <input
              type="date"
              value={loanDate}
              onChange={(e) => setLoanDate(e.target.value)}
              className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Tanggal Tenggat */}
          <div className="mb-4">
            <label className="block text-lg font-medium">Tanggal Tenggat</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Konfirmasi Peminjaman
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanBook;
