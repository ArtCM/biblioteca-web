import { useState, useEffect } from "react";
import "./livros.css";

export default function Books() {
  const [books, setBooks] = useState<{ title: string; author: string; genre: string }[]>([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(storedBooks);
  }, []);

  return (
    <main className="content-container">
      <h1>Livros</h1>
      {books.length > 0 ? (
        <ul className="list">
          {books.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> - {book.author} ({book.genre})
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum livro adicionado ainda.</p>
      )}
    </main>
  );
}