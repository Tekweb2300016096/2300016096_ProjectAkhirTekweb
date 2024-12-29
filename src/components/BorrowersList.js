import React from "react";

const BorrowersList = ({ books, darkMode }) => {
  const borrowers = books
    .filter((book) => book.isBorrowed && book.loanInfo)
    .map((book) => ({
      title: book.title,
      borrowerName: book.loanInfo.borrowerName,
      loanDate: book.loanInfo.loanDate,
      dueDate: book.loanInfo.dueDate,
    }));

  return (
    <div
      className={`my-6 p-6 rounded-lg shadow-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Daftar Peminjam</h1>
      {borrowers.length > 0 ? (
        <ul className="list-disc pl-6">
          {borrowers.map((borrower, index) => (
            <li key={index} className="mb-4">
              <p>
                <strong>Judul Buku:</strong> {borrower.title}
              </p>
              <p>
                <strong>Nama Peminjam:</strong> {borrower.borrowerName}
              </p>
              <p>
                <strong>Tanggal Pinjam:</strong> {borrower.loanDate}
              </p>
              <p>
                <strong>Tanggal Kembali:</strong> {borrower.dueDate}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Tidak ada peminjam saat ini.</p>
      )}
    </div>
  );
};

export default BorrowersList;
