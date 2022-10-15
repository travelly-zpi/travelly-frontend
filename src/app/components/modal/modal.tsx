import "./modal.scss";
import { useEffect, ReactNode } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface ModalProps {
  children: ReactNode;
  onClose?: Function;
}

const Modal = ({ children, onClose }: ModalProps) => {
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
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-exit">
          <CloseOutlined onClick={closeModal} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
