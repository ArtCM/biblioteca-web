import { useState } from "react";
import { WizardsModal } from "../components/WizardsModal/wizardsModal";
import { Step, EntityType } from "../types/EntityTypes";

export function useEntityModal(entityType: EntityType) {
  const [isOpen, setIsOpen] = useState(false);

  const entityConfig: Record<EntityType, Step[]> = {
    book: [
      { title: "Adicionar Livro", inputs: [{ name: "title", type: "text", label: "Título" }, { name: "author", type: "text", label: "Autor" }] },
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

  return {
    openModal: () => setIsOpen(true),
    modal: (
      <WizardsModal isOpen={isOpen} onClose={() => setIsOpen(false)} steps={entityConfig[entityType]} onSubmit={handleSubmit} />
    ),
  };
}
