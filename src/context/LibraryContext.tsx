import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Book } from "../types/Book";
import { Author } from "../types/Author";
import { Category } from "../types/Category";

interface LibraryContextType {
  books: Book[];
  authors: Author[];
  categories: Category[];
  addBook: (book: Book) => void;
  removeBook: (title: string) => void;
  addCategory: (category: Category) => void;
  addAuthor: (author: Author) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useLocalStorage<Book[]>("books", []);
  const [authors, setAuthors] = useLocalStorage<Author[]>("authors", []);
  const [categories, setCategories] = useLocalStorage<Category[]>("categories", []);

  // Adiciona Livros, verifica se ja existe e verifica se o autor e categoria ja existem, se não, os adiciona.
  const addBook = (book: Book) => {
    if (books.some((b) => b.title.toLowerCase() === book.title.toLowerCase())) {
      alert("Livro já existe! Adição não realizada.");
      return;
    }

    let updatedAuthors = [...authors];
    let updatedCategories = [...categories];

    if (!authors.some((author) => author.name.toLowerCase() === book.author.toLowerCase())) {
      const newAuthor: Author = {
        name: book.author,
        age: 0,
        profilePhoto: "",
        nationality: "Desconhecida",
        gender: "outro",
      };
      updatedAuthors = [...authors, newAuthor];
      setAuthors(updatedAuthors);
      localStorage.setItem("authors", JSON.stringify(updatedAuthors));
    }

    if (!categories.some((category) => category.name.toLowerCase() === book.genre.toLowerCase())) {
      const newCategory: Category = { name: book.genre };
      updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }

    setBooks((prev) => {
      const updatedBooks = [...prev, book];
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  // Remove Livro mas mantem autor e categoria
  const removeBook = (title: string) => {
    setBooks((prev) => {
      const updatedBooks = prev.filter((book) => book.title !== title);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  // Adiciona Categoria
  const addCategory = (category: Category) => {
    if (categories.some((c) => c.name.toLowerCase() === category.name.toLowerCase())) {
      alert("Categoria já existe! Adição não realizada.");
      return;
    }
    
    if (!categories.some((c) => c.name.toLowerCase() === category.name.toLowerCase())) {
      setCategories((prev) => {
        const updatedCategories = [...prev, category];
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        return updatedCategories;
      });
    }
  };

  // Adiciona Autor
  const addAuthor = (author: Author) => {
    if (authors.some((a) => a.name.toLowerCase() === author.name.toLowerCase())) {
      alert("Autor já existe! Adição não realizada.");
      return;
    }

    if (!authors.some((a) => a.name.toLowerCase() === author.name.toLowerCase())) {
      setAuthors((prev) => {
        const updatedAuthors = [...prev, author];
        localStorage.setItem("authors", JSON.stringify(updatedAuthors));
        return updatedAuthors;
      });
    }
  };

  return (
    <LibraryContext.Provider value={{ books, authors, categories, addBook, removeBook, addCategory, addAuthor }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary deve ser usado dentro de um LibraryProvider");
  return context;
}
