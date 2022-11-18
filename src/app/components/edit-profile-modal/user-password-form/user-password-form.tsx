import { Button, Form, Input, message } from "antd";
import * as React from "react";

import "./user-password-form.scss";
import { useTranslation } from "react-i18next";
import { UserInterface } from "../../../interfaces/user.interface";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../../../contexts/loading-context";

interface UserPasswordFormProps {
  onClose: Function;
  user: UserInterface;
}

const UserPasswordForm = ({ onClose, user }: UserPasswordFormProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { setLoading, loading } = useContext(LoadingContext);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (apiError) {
      form.validateFields();
    }
  }, [form, apiError]);

  const onSubmit = (values: any) => {
    setLoading(true);
    axios
      .put("/user/changePassword", {
        uuid: user.uuid,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
      .then(() => {
        message.success(t("editProfile.messages.passwordUpdated"));
        onClose();
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
        setApiError(msg);
      })
      .finally(() => setLoading(false));
  };

  const validateApiError = () => {
    if (apiError === "FALSE_PASSWORD") {
      return Promise.reject(t("editProfile.errors.wrongPassword"));
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
      return Promise.reject(t("editProfile.errors.invalidPassword"));
    }
    return Promise.resolve();
  };

  return (
    <div className="user-password-form">
      <Form
        form={form}
        className="form-password"
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="oldPassword"
          label={t("editProfile.oldPassword")}
          rules={[
            { required: true, message: t("editProfile.errors.noOldPassword") },
            { validator: validatePassword },
            {
              validator: validateApiError,
            },
          ]}
        >
          <Input.Password data-testid="old-password" onBlur={() => setApiError("cleared")} />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={t("editProfile.newPassword")}
          rules={[
            { required: true, message: t("editProfile.errors.noNewPassword") },
            { validator: validatePassword },
          ]}
        >
          <Input.Password data-testid="new-password-1" />
        </Form.Item>
        <Form.Item
          name="newPasswordConfirm"
          label={t("editProfile.confirmNewPassword")}
          rules={[
            {
              required: true,
              message: t("editProfile.errors.noNewPasswordConfirm"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  t("editProfile.errors.invalidNewPasswordConfirm")
                );
              },
            }),
          ]}
        >
          <Input.Password data-testid="new-password-2" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
          data-testid="save-new-password"
        >
          {t("editProfile.save")}
        </Button>
      </Form>
    </div>
  );
};

export default UserPasswordForm;
