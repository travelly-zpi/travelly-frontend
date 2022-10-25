import "./verification-modal.scss";
import { Button, Form, Input, message, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface VerificationModalProps {
    open: boolean;
    onClose: Function;
  }

const VerificationModal = ({ open, onClose }: VerificationModalProps) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [apiError, setApiError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (apiError) {
          form.validateFields();
        }
      }, [form, apiError]);
    
      const onSubmit = (model: string) => {
        setLoading(true);
        axios
          .post("/user/register/verify", model)
          .then((res) => {
            const data = res.data;
            message.success(t("register.successText"));
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
        return Promise.resolve();
      };
    
      const clearValidation = (fieldName: string) => {
        if (fieldName === "email" && apiError === "User not found") {
          setApiError("cleared");
        }
      };

      return (
        <Modal
        className="verification-modal"
        open={open}
        title={t("verificationPage.resend")}
        onCancel={() => onClose()}
        footer={null}
      >
        <Form
          className="verification-form"
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
          <Form.Item>
            <Button
              type="primary"
              className="form-button"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              data-testid="submit-login"
            >
              {t("verificationPage.send")}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      );
}

export default VerificationModal;