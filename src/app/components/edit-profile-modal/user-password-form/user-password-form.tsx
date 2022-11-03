import { Button, Form, Input } from "antd";
import * as React from "react";

import "./user-password-form.scss";
import { useTranslation } from "react-i18next";

const UserPasswordForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // message.success("Your password was successfully updated!")

  return (
    <div className="user-password-form">
      <Form form={form} className="form-password" layout="vertical">
        <Form.Item label={t("editProfile.oldPassword")}>
          <Input.Password />
        </Form.Item>
        <Form.Item label={t("editProfile.newPassword")}>
          <Input.Password />
        </Form.Item>
        <Form.Item label={t("editProfile.confirmNewPassword")}>
          <Input.Password />
        </Form.Item>
        <Button type="primary">{t("editProfile.save")}</Button>
      </Form>
    </div>
  );
};

export default UserPasswordForm;
