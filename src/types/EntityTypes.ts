import { FieldValues, UseFormReset } from "react-hook-form"; // ✅ Removemos SubmitHandler

export type EntityType = "book" | "author" | "category";

export interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
  favorite: boolean;
  description: string;
  pages: number;
  color: string;
}

export interface Author {
  name: string;
  age: number;
  gender: "homem" | "mulher" | "outro";
  nationality: string;
}

export interface Category {
  name: string;
}

export interface Step {
  title: string;
  inputs: { 
    name: string; 
    type: string; 
    label: string;
  }[];
}

export interface MultiStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Step[];
  onSubmit: (data: FieldValues, reset: UseFormReset<FieldValues>) => void;
}
