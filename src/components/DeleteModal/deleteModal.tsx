import * as Dialog from "@radix-ui/react-dialog";
import "./deleteModal.css"; 

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export function DeleteModal({ isOpen, onClose, onConfirm, itemName }: DeleteModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay">
          <Dialog.Content className="modal-content">
            <Dialog.Title>Confirmar Exclusão</Dialog.Title>
            <p>Tem certeza que deseja excluir "{itemName}"?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={onConfirm}>Sim</button>
              <button className="cancel-btn" onClick={onClose}>Cancelar</button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
