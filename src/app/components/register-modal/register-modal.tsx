import "./register-modal.scss";

import Modal from "../modal/modal";
import ClipartRegister from "../../assets/img/clipart-register";
import logo from "../../assets/img/logo.jpeg";
import { Typography } from "antd";

const { Title, Text } = Typography;

interface RegisterModalProps {
  onClose: Function;
}

const RegisterModal = ({ onClose }: RegisterModalProps) => {
  return (
    <Modal onClose={onClose}>
      <div className="register-container">
        <div className="image-block">
          <ClipartRegister />
          <img src={logo} alt="Travelly logo" className="logo" />
        </div>
        <div className="form-block">
          <div>
            <Title level={3}>Sign up</Title>
            <Text type="secondary">Already have an account? </Text>
            <Text type="warning">Log in</Text>
          </div>
          <div></div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
