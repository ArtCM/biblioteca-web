import { useState, useEffect } from "react";
import "./categorias.css";

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    setCategories(storedCategories.map((cat: { name: string }) => cat.name));
  }, []);

  return (
    <main className="content-container">
      <h1>Categorias</h1>
      {categories.length > 0 ? (
        <ul className="list">
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma categoria adicionada ainda.</p>
      )}
    </main>
  );
}
