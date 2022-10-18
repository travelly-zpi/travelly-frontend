import "./edit-profile-modal.scss";

import Modal from "../modal/modal";

import {
  Avatar,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Tabs,
  Typography,
} from "antd";

import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import UserContext from "../../contexts/user-context";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo.png";
import * as React from "react";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface EditProfileModal {
  onClose: Function;
}

const EditProfileModal = ({ onClose }: EditProfileModal) => {
  const [formEditProfile] = Form.useForm();
  const [formPassword] = Form.useForm();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //     if (apiError) {
  //         form.validateFields();
  //     }
  // }, [form, apiError]);
  //
  // const onSubmit = (model: LoginUserInterface) => {
  //     setLoading(true);
  //     axios
  //         .post("/user/authenticate", model)
  //         .then((res) => {
  //             const data = res.data;
  //             onLogin({ token: data._token, ...data.user }, model.remember);
  //             message.success(t("login.successText"));
  //             onClose();
  //         })
  //         .catch((err) => {
  //             setLoading(false);
  //             const msg = err.response?.data?.message;
  //             console.error(msg);
  //             setApiError(msg);
  //         });
  // };

  const forms = [
    {
      label: "Profile Info",
      key: "profile-info",
      children: (
        <div className="profile-info-block">
          <div className="avatar-block">
            <Avatar size={120} icon={<UserOutlined />} />
            <Button type="primary">Upload new avatar</Button>
            <Button>
              <Text type="danger">Delete avatar</Text>
            </Button>
          </div>

          <Form form={formEditProfile} layout="vertical">
            <div className="form-horizontal">
              <Form.Item label="Name">
                <Input />
              </Form.Item>
              <Form.Item label="Surname">
                <Input />
              </Form.Item>
              <Form.Item label="Email">
                <Input />
              </Form.Item>
              <Form.Item label="Localization">
                <Input />
              </Form.Item>
              <Form.Item label="Date of birth">
                <Input />
              </Form.Item>
              <Form.Item label="Languages">
                <Input />
              </Form.Item>
            </div>

            <TextArea rows={4} placeholder="Write something more about you" />
            <Button type="primary">Save</Button>
          </Form>
        </div>
      ),
    },
    {
      label: "Password",
      key: "password",
      children: (
        <Form form={formPassword} className="form-password" layout="vertical">
          <Form.Item label="Old password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="New password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirm new password">
            <Input.Password />
          </Form.Item>
          <Button type="primary">Save</Button>
        </Form>
      ),
    },
  ];

  return (
    <Modal onClose={onClose}>
      <div className="edit-profile-container">
        <Title level={3}>Edit Profile</Title>
        <Tabs items={forms} />
        <img src={logo} alt="Travelly logo" className="logo" />
      </div>
    </Modal>
  );
};

export default EditProfileModal;
