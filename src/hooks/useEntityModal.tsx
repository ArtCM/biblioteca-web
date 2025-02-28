import { useState } from "react";
import { WizardsModal } from "../components/WizardsModal/wizardsModal";
import { Step, EntityType } from "../types/EntityTypes";
import { useLibrary } from "../context/LibraryContext";
import { FieldValues, UseFormReset } from "react-hook-form";

export function useEntityModal(entityType: EntityType) {
  const [isOpen, setIsOpen] = useState(false);
  const { addBook, addAuthor, addCategory } = useLibrary();

  // Campo Responsável pelo formulário. Para adicionar mais campos basta colocar dentro de title e para adicionar mais steps basta adicionar mais um title dentro do array
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

  const handleSubmit = (data: FieldValues, resetForm: UseFormReset<FieldValues>) => {
    if (entityType === "book") {
      addBook({
        title: data.title.trim(),
        author: data.author.trim(),
        year: Number(data.year), 
        genre: data.genre.trim(), 
        favorite: data.favorite === "on",
        description: data.description.trim(), 
        pages: Number(data.pages), 
        color: data.color 
      });
    } 
    else if (entityType === "author") {
      addAuthor({
        name: data.name.trim(),
        age: Number(data.age),
        gender: data.gender as "homem" | "mulher" | "outro",
        nationality: data.nationality.trim(),
      });
    } 
    else if (entityType === "category") {
      addCategory({ name: data.name.trim() });
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
