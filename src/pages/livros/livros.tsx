import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import { DeleteModal } from "../../components/DeleteModal/deleteModal";
import * as Dialog from "@radix-ui/react-dialog";

import "../../assets/style/tabelas.css";
import "./livros.css";

export default function Books() {
  const { books, removeBook } = useLibrary();
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  return (
    <main className="content-container">
      <h1>Livros</h1>

      {books.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button className="expand-btn" onClick={() => setSelectedBook(book.title)}>+</button>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="modal-overlay">
                          <Dialog.Content className="modal-content">
                            <Dialog.Title>Detalhes do Livro</Dialog.Title>
                            <Dialog.Close className="close-btn">×</Dialog.Close>

                            {selectedBook === book.title && (
                              <div className="book-details">
                                <p><strong>Nome:</strong> {book.title}</p>
                                <p><strong>Autor:</strong> {book.author}</p>
                                <p><strong>Categoria:</strong> {book.genre}</p>
                                <p><strong>Ano de Publicação:</strong> {book.year}</p>
                                <p><strong>Páginas:</strong> {book.pages}</p>
                                <p><strong>Descrição:</strong> {book.description}</p>
                                <p><strong>Favorito:</strong> {book.favorite ? "Sim" : "Não"}</p>
                                <div style={{display: "flex", gap: "10px"}}>
                                  <p><strong>Cor:</strong></p>
                                  <div className="color-box" style={{ backgroundColor: book.color }}></div>
                                </div>
                              </div>
                            )}
                          </Dialog.Content>
                        </Dialog.Overlay>
                      </Dialog.Portal>
                    </Dialog.Root>

                    <button className="delete-btn" onClick={() => setBookToDelete(book.title)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nenhum livro adicionado ainda.</p>
      )}

      <DeleteModal
        isOpen={!!bookToDelete}
        onClose={() => setBookToDelete(null)}
        onConfirm={() => {
          if (bookToDelete) removeBook(bookToDelete);
          setBookToDelete(null);
        }}
        itemName={bookToDelete || ""}
      />
    </main>
  );
}
