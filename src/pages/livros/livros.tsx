import { useState, useEffect } from "react";
import "./livros.css";
import { Book } from "../../types/EntityTypes"; 

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]); 

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(storedBooks as Book[]);
  }, []);

  return (
    <main className="content-container">
      <h1>Livros</h1>
      {books.length > 0 ? (
        <ul className="list">
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
