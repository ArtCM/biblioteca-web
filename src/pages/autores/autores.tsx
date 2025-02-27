import { useState, useEffect } from "react";
import "./autores.css";

export default function Authors() {
  const [authors, setAuthors] = useState<{ name: string; age: number; gender: string; nationality: string }[]>([]);

  useEffect(() => {
    const storedAuthors = JSON.parse(localStorage.getItem("authors") || "[]");
    setAuthors(storedAuthors);
  }, []);

  return (
    <main className="content-container">
      <h1>Autores</h1>
      {authors.length > 0 ? (
        <ul className="list">
          {authors.map((author, index) => (
            <li key={index}>
              <strong>{author.name}</strong> - {author.gender}, {author.age} anos ({author.nationality})
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum autor adicionado ainda.</p>
      )}
    </main>
  );
}
