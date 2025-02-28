import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import { DeleteModal } from "../../components/DeleteModal/deleteModal";

import "../../assets/style/tabelas.css";

export default function Categories() {
  const { categories, removeCategory } = useLibrary();
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  return (
    <main className="content-container">
      <h1>Categorias</h1>

      {categories.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome da Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <button className="delete-btn" onClick={() => setCategoryToDelete(category.name)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nenhuma categoria adicionada ainda.</p>
      )}

      <DeleteModal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={() => {
          if (categoryToDelete) removeCategory(categoryToDelete);
          setCategoryToDelete(null);
        }}
        itemName={categoryToDelete || ""}
      />
    </main>
  );
}
