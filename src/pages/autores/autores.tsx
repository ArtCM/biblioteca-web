import { useState, useEffect } from "react";
import "./autores.css";

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = () => {
      setAuthors(JSON.parse(localStorage.getItem("authors") || "[]"));
    };

    fetchAuthors();
    window.addEventListener("localStorageUpdate", fetchAuthors);
    return () => window.removeEventListener("localStorageUpdate", fetchAuthors);
  }, []);

  return (
    <main className="content-container">
      <h1>Autores</h1>
      {authors.length > 0 ? (
        <ul>
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
