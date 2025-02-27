import { useState, useEffect } from "react";
import "./autores.css";
import { Author } from "../../types/EntityTypes";
export default function Authors() {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const storedAuthors = JSON.parse(localStorage.getItem("authors") || "[]");
    setAuthors(storedAuthors as Author[]);
  }, []);

  return (
    <main className="content-container">
      <h1>Autores</h1>
      {authors.length > 0 ? (
        <ul className="list">
          {authors.map((author, index) => (
            <li key={index}>{author.name} - {author.nationality}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum autor adicionado ainda.</p>
      )}
    </main>
  );
}
