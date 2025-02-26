import { FieldValues, SubmitHandler } from "react-hook-form";

export interface Step {
  title: string;
  inputs: { name: string; type: string; label: string }[];
}

export interface MultiStepModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  steps: Step[]; 
  onSubmit: SubmitHandler<FieldValues>;
}

export interface EntityType {
  entityType: "book" | "author" | "category";
}