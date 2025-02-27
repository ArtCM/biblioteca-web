import { useState, useEffect } from "react";
import "./livros.css";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = () => {
      setBooks(JSON.parse(localStorage.getItem("books") || "[]"));
    };

    fetchBooks();
    window.addEventListener("localStorageUpdate", fetchBooks);
    return () => window.removeEventListener("localStorageUpdate", fetchBooks);
  }, []);

  return (
    <main className="content-container">
      <h1>Livros</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book.title} - {book.author}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum livro adicionado ainda.</p>
      )}
    </main>
  );
}
