import React from "react";

const ReturnedBooksList = ({ books, darkMode }) => {
  const returnedBooks = books
    .filter((book) => !book.isBorrowed && book.loanInfo)
    .map((book) => ({
      title: book.title,
      borrowerName: book.loanInfo.borrowerName,
      returnDate: book.loanInfo.dueDate,
    }));

  return (
    <div
      className={`my-6 p-6 rounded-lg shadow-lg ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Buku Dikembalikan</h1>
      {returnedBooks.length > 0 ? (
        <ul className="list-disc pl-6">
          {returnedBooks.map((returnedBook, index) => (
            <li key={index} className="mb-4">
              <p>
                <strong>Judul Buku:</strong> {returnedBook.title}
              </p>
              <p>
                <strong>Nama Pengembali:</strong> {returnedBook.borrowerName}
              </p>
              <p>
                <strong>Tanggal Pengembalian:</strong> {returnedBook.returnDate}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Tidak ada buku yang dikembalikan saat ini.</p>
      )}
    </div>
  );
};

export default ReturnedBooksList;
