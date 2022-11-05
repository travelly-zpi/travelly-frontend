import "./modal.scss";
import { useEffect, ReactNode } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface ModalProps {
  children: ReactNode;
  onClose?: Function;
  size?: "large" | "small";
}

const Modal = ({ children, onClose, size = "small" }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = () => {
    document.body.style.overflow = "visible";
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div
        className={
          "modal-container" + (size === "large" ? " modal-container-large" : "")
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-exit">
          <CloseOutlined onClick={closeModal} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
