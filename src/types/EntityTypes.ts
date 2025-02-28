export type EntityType = "book" | "author" | "category";

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
  onSubmit: (data: any, reset: () => void) => void;
}
