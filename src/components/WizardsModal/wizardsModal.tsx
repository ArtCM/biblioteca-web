import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { MultiStepModalProps } from "../../types/EntityTypes";

import "./wizardsModal.css";

export function WizardsModal({ isOpen, onClose, steps, onSubmit }: MultiStepModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, reset, getValues } = useForm();

  useEffect(() => {
    if (!isOpen) setCurrentStep(0);
  }, [isOpen]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleFormSubmit = () => {
    onSubmit(getValues(), reset);
    setCurrentStep(0);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="modal-overlay">
        <Dialog.Content className="modal-content">
          {steps.length > 1 && (
            <div className="step-indicator">
              {steps.map((_, index) => (
                <span key={index} className={index === currentStep ? "active-step" : ""}></span>
              ))}
            </div>
          )}

          <Dialog.Title>{steps[currentStep].title}</Dialog.Title>
          <Dialog.Close className="closeBtn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </Dialog.Close>
          <form> 
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
                <button type="button" onClick={handleSubmit(handleFormSubmit)}>Finalizar</button> 
              )}
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}
