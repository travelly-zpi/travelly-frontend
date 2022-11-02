import "./login-modal.scss";

import Modal from "../modal/modal";
import ClipartLogin from "../../assets/img/clipart-login";
import logo from "../../assets/img/logo.png";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { LoginUserInterface } from "../../interfaces/login-user.interface";
import axios from "axios";
import UserContext from "../../contexts/user-context";

const { Title, Text, Link } = Typography;

interface LoginModalProps {
  onClose: Function;
  onModalSwitch: Function;
}

const LoginModal = ({ onClose, onModalSwitch }: LoginModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { onLogin } = useContext(UserContext);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (apiError) {
      form.validateFields();
    }
  }, [form, apiError]);

  const onSubmit = (model: LoginUserInterface) => {
    setLoading(true);
    axios
      .post("/user/authenticate", model)
      .then((res) => {
        const data = res.data;
        onLogin({ token: data._token, ...data.user }, model.remember);
        message.success(t("login.successText"));
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        const msg = err.response?.data?.message;
        console.error(msg);
        setApiError(msg);
      });
  };

  const validate = (rule: any) => {
    if (rule.field === "email" && apiError === "User not found") {
      return Promise.reject(t("login.errors.wrongEmail"));
    }
    if (rule.field === "email" && apiError === "NOT_ACTIVATED") {
      return Promise.reject(t("login.errors.notActivated"));
    }
    if (rule.field === "password" && apiError === "FALSE_PASSWORD") {
      return Promise.reject(t("login.errors.wrongPassword"));
    }
    return Promise.resolve();
  };

  const clearValidation = (fieldName: string) => {
    if (
      (fieldName === "email" && apiError === "User not found") ||
      (fieldName === "password" && apiError === "FALSE_PASSWORD") ||
      (fieldName === "email" && apiError === "NOT_ACTIVATED")
    ) {
      setApiError("cleared");
    }
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
          <Form
            className="login-form"
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            requiredMark={false}
          >
            <Form.Item
              label={t("login.email")}
              name="email"
              rules={[
                { required: true, message: t("login.errors.noEmail") },
                { type: "email", message: t("login.errors.invalidEmail") },
                {
                  validator: validate,
                },
              ]}
              hasFeedback
            >
              <Input
                onBlur={() => clearValidation("email")}
                data-testid="email"
              />
            </Form.Item>
            <Form.Item
              label={t("login.password")}
              name="password"
              rules={[
                { required: true, message: t("login.errors.noPassword") },
                { validator: validate },
              ]}
            >
              <Input.Password
                onBlur={() => clearValidation("password")}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                data-testid="password"
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>{t("login.rememberMe")}</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="form-button"
                htmlType="submit"
                loading={loading}
                disabled={loading}
                data-testid="submit-login"
              >
                {t("login.buttonText")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
