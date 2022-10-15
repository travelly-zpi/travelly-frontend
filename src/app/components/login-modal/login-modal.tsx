import "./login-modal.scss";

import Modal from "../modal/modal";
import ClipartLogin from "../../assets/img/clipart-login";
import logo from "../../assets/img/logo.png";
import { Button, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { LoginUserInterface } from "../../interfaces/login-user.interface";
import axios from "axios";
import UserContext from "../../contexts/user-context";

const { Title, Text, Link } = Typography;

interface LoginModalProps {
  onClose: Function;
  onModalSwitch: Function;
}

const LoginModal = ({ onClose, onModalSwitch }: LoginModalProps) => {
  const [model, setModel] = useState<LoginUserInterface>({
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { onLogin } = useContext(UserContext);

  const onSubmit = () => {
    if (!model.userName || !model.password) {
      return;
    }
    axios
      .post("/user/authenticate", model)
      .then((res) => {
        const data = res.data;
        onLogin({ token: data._token, ...data.user });
        onClose();
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
  };

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
            <Input
              value={model.userName}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setModel({ ...model, userName: e.currentTarget.value })
              }
            />
            <Text>{t("login.password")}</Text>
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              value={model.password}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setModel({ ...model, password: e.currentTarget.value })
              }
            />
            <Text type="danger">{error} </Text>
          </div>

          <Button type="primary" className="form-button" onClick={onSubmit}>
            {t("login.buttonText")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
