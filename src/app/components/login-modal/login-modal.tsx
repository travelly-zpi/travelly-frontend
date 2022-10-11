import Modal from "../modal/modal";

interface RegisterModalProps {
  onClose: Function;
}

const LoginModal = ({ onClose }: RegisterModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div>Login here</div>
    </Modal>
  );
};

export default LoginModal;
