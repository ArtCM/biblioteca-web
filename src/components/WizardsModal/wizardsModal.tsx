import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MultiStepModalProps } from "../../types/WizardsModal";
import './wizardsModal.css'

export function MultiStepModal({ isOpen, onClose, steps, onSubmit }: MultiStepModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit } = useForm();

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="modal-overlay" />
      <Dialog.Content className="modal-content">
        {steps.length > 1 && (
          <div className="step-indicator">
            {steps.map((_, index) => (
              <span key={index} className={index === currentStep ? "active-step" : ""}></span>
            ))}
          </div>
        )}

        <Dialog.Title>{steps[currentStep].title}</Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          {steps[currentStep].inputs.map((input) => (
            <div key={input.name} className="form-group">
              <label htmlFor={input.name}>{input.label}</label>
              <input id={input.name} type={input.type} {...register(input.name)} required />
            </div>
          ))}

          <div className="modal-footer">
            {currentStep > 0 && <button type="button" onClick={prevStep}>Voltar</button>}
            {currentStep < steps.length - 1 ? (
              <button type="button" onClick={nextStep}>Próximo</button>
            ) : (
              <button type="submit">Finalizar</button>
            )}
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
