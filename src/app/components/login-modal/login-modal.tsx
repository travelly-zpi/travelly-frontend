import "./login-modal.scss";

import Modal from "../modal/modal";
import ClipartLogin from "../../assets/img/clipart-login";
import logo from "../../assets/img/logo.png";
import { Button, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Title, Text, Link } = Typography;

interface LoginModalProps {
  onClose: Function;
  onModalSwitch: Function;
}

const LoginModal = ({ onClose, onModalSwitch }: LoginModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className="login-container">
        <div className="image-block">
          <ClipartLogin />
          <img src={logo} alt="Travelly logo" className="logo" />
        </div>
        <div className="form-block">
          <div>
            <Title level={3}>{t("login.title")}</Title>
            <Text type="secondary">{t("login.subTitle1")}</Text>
            <Link onClick={() => onModalSwitch()}>{t("login.subTitle2")}</Link>
          </div>
          <div className="form-controls">
            <Text>{t("login.email")}</Text>
            <Input />
            <Text>{t("login.password")}</Text>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <Button type="primary" className="form-button">
            {t("login.buttonText")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
