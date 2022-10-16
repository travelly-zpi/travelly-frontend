import "./register-modal.scss";

import Modal from "../modal/modal";
import ClipartRegister from "../../assets/img/clipart-register";
import logo from "../../assets/img/logo.png";
import { Button, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect } from "react";

const { Title, Text, Link } = Typography;

interface RegisterModalProps {
  onClose: Function;
  onModalSwitch: Function;
}

const RegisterModal = ({ onClose, onModalSwitch }: RegisterModalProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .post<any>("/user/authenticate", { userName: "root", password: "root" })
      .then((data) => console.log(data));
  }, []);

  return (
    <Modal onClose={onClose}>
      <div className="register-container">
        <div className="image-block">
          <ClipartRegister />
          <img src={logo} alt="Travelly logo" className="logo" />
        </div>
        <form className="form-block" noValidate>
          <div>
            <Title level={3}>{t("register.title")}</Title>
            <Text type="secondary">{t("register.subTitle1")}</Text>
            <Link onClick={() => onModalSwitch()}>
              {t("register.subTitle2")}
            </Link>
          </div>
          <div className="form-controls">
            <Text>{t("register.name")}</Text>
            <Input />
            <Text>{t("register.surname")}</Text>
            <Input />
            <Text>{t("register.email")}</Text>
            <Input />
            <Text>{t("register.password")}</Text>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Text>{t("register.passwordConfirm")}</Text>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <Button type="primary" htmlType="submit" className="form-button">
            {t("register.buttonText")}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
