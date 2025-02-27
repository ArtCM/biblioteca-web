import { useState } from "react";
import { WizardsModal } from "../components/WizardsModal/wizardsModal";
import { Step, EntityType, Book, Author, Category } from "../types/EntityTypes";
import { useLocalStorage } from "./useLocalStorage";
import { FieldValues, UseFormReset } from "react-hook-form";

export function useEntityModal(entityType: EntityType) {
  const [isOpen, setIsOpen] = useState(false);

  const [books, setBooks] = useLocalStorage<Book[]>("books", []);
  const [authors, setAuthors] = useLocalStorage<Author[]>("authors", []);
  const [categories, setCategories] = useLocalStorage<Category[]>("categories", []);

  const entityConfig: Record<EntityType, Step[]> = {
    book: [
      { title: "Adicionar Livro", inputs: [
        { name: "title", type: "text", label: "Título" },
        { name: "author", type: "text", label: "Autor" },
        { name: "genre", type: "text", label: "Gênero" },
        { name: "favorite", type: "checkbox", label: "Favorito" },
      ] },
      { title: "Detalhes", inputs: [
        { name: "year", type: "number", label: "Ano de Publicação" },
        { name: "pages", type: "number", label: "Páginas" },
        { name: "color", type: "color", label: "Cor" },
      ] },
      { title: "Descrição", inputs: [
        { name: "description", type: "text", label: "Descrição" },
      ] }
    ],
    author: [
      { title: "Adicionar Autor", inputs: [
        { name: "name", type: "text", label: "Nome" },
        { name: "age", type: "number", label: "Idade" },
        { name: "gender", type: "radio", label: "Gênero" },
        { name: "nationality", type: "text", label: "Nacionalidade" },
      ] }    
    ],
    category: [
      { title: "Criar Categoria", inputs: [
        { name: "name", type: "text", label: "Nome da Categoria" },
      ] }    
    ],
  };

  const triggerUpdate = () => {
    window.dispatchEvent(new Event("localStorageUpdate")); // ✅ Dispara evento para atualização
  };

  const handleSubmit = (data: FieldValues, resetForm: UseFormReset<FieldValues>) => {
    if (entityType === "book") {
      const newBook: Book = { 
        title: data.title.trim(),
        author: data.author.trim(),
        year: Number(data.year), 
        genre: data.genre.trim(), 
        favorite: data.favorite === "on",
        description: data.description.trim(), 
        pages: Number(data.pages), 
        color: data.color 
      };

      if (books.some(book => book.title.toLowerCase() === newBook.title.toLowerCase())) {
        alert("Livro já existe! Nenhuma adição feita.");
        setIsOpen(false);
        return;
      }

      setBooks(prevBooks => [...prevBooks, newBook]);
      triggerUpdate(); // ✅ Atualiza a listagem imediatamente

      if (!authors.some(author => author.name.toLowerCase() === newBook.author.toLowerCase())) {
        setAuthors(prevAuthors => [...prevAuthors, { name: newBook.author, age: 0, gender: "outro", nationality: "" }]);
        triggerUpdate();
      }

      if (!categories.some(category => category.name.toLowerCase() === newBook.genre.toLowerCase())) {
        setCategories(prevCategories => [...prevCategories, { name: newBook.genre }]);
        triggerUpdate();
      }
    }

    if (entityType === "author") {
      const newAuthor: Author = {
        name: data.name.trim(),
        age: Number(data.age),
        gender: data.gender as "homem" | "mulher" | "outro",
        nationality: data.nationality.trim()
      };

      if (!authors.some(author => author.name.toLowerCase() === newAuthor.name.toLowerCase())) {
        setAuthors(prevAuthors => [...prevAuthors, newAuthor]);
        triggerUpdate();
      }
    }

    if (entityType === "category") {
      const newCategory: Category = { name: data.name.trim() };

      if (!categories.some(category => category.name.toLowerCase() === newCategory.name.toLowerCase())) {
        setCategories(prevCategories => [...prevCategories, newCategory]);
        triggerUpdate();
      }
    }

    setIsOpen(false);
    resetForm();
  };

  return {
    openModal: () => setIsOpen(true),
    modal: (
      <WizardsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        steps={entityConfig[entityType]}
        onSubmit={(data, reset) => handleSubmit(data, reset)}
      />
    ),
  };
}
