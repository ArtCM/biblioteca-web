import { useState, useEffect } from "react";
import "./livros.css";
import { Book } from "../../types/Book";
import * as Dialog from "@radix-ui/react-dialog"; // Modal Radix UI

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  // Buscar livros do localStorage
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    setBooks(storedBooks as Book[]);
  }, []);

  // Função para excluir livro
  const deleteBook = () => {
    if (!bookToDelete) return;
    const updatedBooks = books.filter(book => book.title !== bookToDelete.title);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBookToDelete(null);
  };

  return (
    <main className="content-container">
      <h1>Livros</h1>

      {books.length > 0 ? (
        <table className="books-table">
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
                      <button
                        className="expand-btn"
                        onClick={() => setSelectedBook(book)}
                      >
                        +
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="modal-overlay" >
                        <Dialog.Content className="modal-content">
                          <Dialog.Title>Detalhes do Livro</Dialog.Title>
                          <Dialog.Close className="close-btn">×</Dialog.Close>

                          {selectedBook && (
                            <div className="book-details">
                              <p><strong>Nome:</strong> {selectedBook.title}</p>
                              <p><strong>Autor:</strong> {selectedBook.author}</p>
                              <p><strong>Categoria:</strong> {selectedBook.genre}</p>
                              <p><strong>Ano de Publicação:</strong> {selectedBook.year}</p>
                              <p><strong>Páginas:</strong> {selectedBook.pages}</p>
                              <p><strong>Descrição:</strong> {selectedBook.description}</p>
                              <p><strong>Favorito:</strong> {selectedBook.favorite ? "Sim" : "Não"}</p>
                              <div className="color-box" style={{ backgroundColor: selectedBook.color }}></div>
                            </div>
                          )}
                        </Dialog.Content>
                      </ Dialog.Overlay>
                    </Dialog.Portal>
                  </Dialog.Root>

                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        className="delete-btn"
                        onClick={() => setBookToDelete(book)}
                      >
                        🗑️
                      </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="modal-overlay" >
                        <Dialog.Content className="modal-content">
                          <Dialog.Title>Confirmar Exclusão</Dialog.Title>
                          <Dialog.Close className="close-btn">×</Dialog.Close>
                          <p>Tem certeza que deseja excluir "{bookToDelete?.title}"?</p>
                          <div className="modal-actions">
                            <Dialog.Close className="confirm-btn" onClick={deleteBook}>Sim</Dialog.Close>
                            <Dialog.Close className="cancel-btn">Cancelar</Dialog.Close>
                          </div>
                        </Dialog.Content>
                      </ Dialog.Overlay>
                    </Dialog.Portal>
                  </Dialog.Root>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum livro adicionado ainda.</p>
      )}
    </main>
  );
}
