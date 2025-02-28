import { useState } from "react";
import "./autores.css";
import { useLibrary } from "../../context/LibraryContext";
import { DeleteModal } from "../../components/DeleteModal/deleteModal";
import * as Dialog from "@radix-ui/react-dialog";

export default function Authors() {
  const { authors, removeAuthor } = useLibrary();
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [authorToDelete, setAuthorToDelete] = useState<string | null>(null);

  return (
    <main className="content-container">
      <h1>Autores</h1>

      {authors.length > 0 ? (
        <table className="authors-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Nacionalidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{author.name}</td>
                <td>{author.nationality}</td>
                <td>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button className="expand-btn" onClick={() => setSelectedAuthor(author.name)}>+</button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="modal-overlay">
                        <Dialog.Content className="modal-content">
                          <Dialog.Title>Detalhes do Autor</Dialog.Title>
                          <Dialog.Close className="close-btn">×</Dialog.Close>

                          {selectedAuthor === author.name && (
                            <div className="author-details">
                              <p><strong>Nome:</strong> {author.name}</p>
                              <p><strong>Idade:</strong> {author.age}</p>
                              <p><strong>Gênero:</strong> {author.gender}</p>
                              <p><strong>Nacionalidade:</strong> {author.nationality}</p>
                              {author.profilePhoto && (
                                <div>
                                  <p><strong>Foto:</strong></p>
                                  <img src={author.profilePhoto} alt={author.name} className="author-photo" />
                                </div>
                              )}
                            </div>
                          )}
                        </Dialog.Content>
                      </Dialog.Overlay>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <button className="delete-btn" onClick={() => setAuthorToDelete(author.name)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum autor adicionado ainda.</p>
      )}

      <DeleteModal
        isOpen={!!authorToDelete}
        onClose={() => setAuthorToDelete(null)}
        onConfirm={() => {
          if (authorToDelete) removeAuthor(authorToDelete);
          setAuthorToDelete(null);
        }}
        itemName={authorToDelete || ""}
      />
    </main>
  );
}
