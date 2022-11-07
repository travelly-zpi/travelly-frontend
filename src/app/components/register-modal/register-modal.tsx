import "./register-modal.scss";

import Modal from "../modal/modal";
import ClipartRegister from "../../assets/img/clipart-register";
import logo from "../../assets/img/logo.png";
import { Button, Form, Input, message, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { RegisterUserInterface } from "../../interfaces/register-user.interface";
import LoadingContext from "../../contexts/loading-context";

const { Title, Text, Link } = Typography;

interface RegisterModalProps {
  onClose: Function;
  onModalSwitch: Function;
}

const RegisterModal = ({ onClose, onModalSwitch }: RegisterModalProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (apiError) {
      form.validateFields();
    }
  }, [form, apiError]);

  const onSubmit = (model: RegisterUserInterface) => {
    setLoading(true);
    axios
      .post("/user/register", model)
      .then(() => {
        message.success(t("register.successText"), 4);
        onModalSwitch();
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
        setApiError(msg);
      })
      .finally(() => setLoading(false));
  };

  const validateApiError = () => {
    if (apiError === "EMAIL_EXISTS") {
      return Promise.reject(t("register.errors.emailTaken"));
    }
    return Promise.resolve();
  };

  const validatePassword = (rule: any, value: string) => {
    if (
      value &&
      !value.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      return Promise.reject(t("register.errors.invalidPassword"));
    }
    return Promise.resolve();
  };

  return (
    <Modal onClose={onClose}>
      <div className="register-container">
        <div className="image-block">
          <ClipartRegister />
          <img src={logo} alt="Travelly logo" className="logo" />
        </div>
        <div className="form-block">
          <div>
            <Title level={3}>{t("register.title")}</Title>
            <Text type="secondary">{t("register.subTitle1")}</Text>
            <Link onClick={() => onModalSwitch()}>
              {t("register.subTitle2")}
            </Link>
          </div>
          <Form
            className="register-form"
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            requiredMark={false}
          >
            <Form.Item
              label={t("register.firstName")}
              name="firstName"
              rules={[
                { required: true, message: t("register.errors.noFirstName") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("register.lastName")}
              name="lastName"
              rules={[
                { required: true, message: t("register.errors.noLastName") },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("register.email")}
              name="email"
              rules={[
                { required: true, message: t("register.errors.noEmail") },
                { type: "email", message: t("register.errors.invalidEmail") },
                {
                  validator: validateApiError,
                },
              ]}
              hasFeedback
            >
              <Input onBlur={() => setApiError("cleared")} />
            </Form.Item>
            <Form.Item
              label={t("register.password")}
              name="password"
              rules={[
                { required: true, message: t("register.errors.noPassword") },
                { validator: validatePassword },
              ]}
              hasFeedback
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label={t("register.passwordConfirm")}
              name="passwordConfirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t("register.errors.noPasswordConfirm"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      t("register.errors.invalidPasswordConfirm")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="form-button"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                {t("register.buttonText")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
