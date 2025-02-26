import { useState } from "react";
import { MultiStepModal } from "../WizardsModal/wizardsModal";
import { Step, EntityType } from "../../types/WizardsModal";
import './addEntityModal.css'

export function AddEntityModal({ entityType }: EntityType) {
  const [isOpen, setIsOpen] = useState(false);

  const entityConfig: Record<"book" | "author" | "category", Step[]> = {
    book: [
      { title: "Informações do Livro", inputs: [{ name: "title", type: "text", label: "Título" }, { name: "author", type: "text", label: "Autor" }] },
      { title: "Detalhes do Livro", inputs: [{ name: "category", type: "text", label: "Categoria" }, { name: "year", type: "number", label: "Ano de Publicação" }] },
    ],
    author: [
      { title: "Informações do Autor", inputs: [{ name: "name", type: "text", label: "Nome do Autor" }] },
    ],
    category: [
      { title: "Criar Categoria", inputs: [{ name: "categoryName", type: "text", label: "Nome da Categoria" }] },
    ],
  };

  const handleSubmit = (data: any) => {
    console.log(`Nova entrada (${entityType}):`, data);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Adicionar {entityType}</button>
      <MultiStepModal isOpen={isOpen} onClose={() => setIsOpen(false)} steps={entityConfig[entityType]} onSubmit={handleSubmit} />
    </div>
  );
}
