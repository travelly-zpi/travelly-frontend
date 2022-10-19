import "./edit-profile-modal.scss";

import Modal from "../modal/modal";

import {
  AutoComplete,
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Tabs,
  Typography,
} from "antd";

import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import UserContext from "../../contexts/user-context";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../assets/img/logo.png";
import * as React from "react";
import { UserInterface } from "../../interfaces/user.interface";
import axios from "axios";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface EditProfileModal {
  onClose: Function;
  user: UserInterface | null;
}

const EditProfileModal = ({ onClose, user }: EditProfileModal) => {
  const [formEditProfile] = Form.useForm();
  const [formPassword] = Form.useForm();
  const { t, i18n } = useTranslation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState();

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

  console.log({ ...user });

  const onLocationChange = (val: string) => {
    if (val) {
      const axiosNoAuth = axios.create();
      delete axiosNoAuth.defaults.headers.common["Authorization"];
      axiosNoAuth.defaults.baseURL = "https://api.maptiler.com";

      axiosNoAuth
        .get(
          `/geocoding/${val}.json?key=QQ2rEJLoN9kxixjRTVJa&language=${i18n.language}`,
          {}
        )
        .then(({ data }) => {
          const locations = data.features.map((feature: any) => ({
            label: feature.place_name,
            value:
              feature.text_en +
              ", " +
              feature.context[feature.context.length - 1].text_en,
            key: feature.id,
          }));

          setLocations(locations);
          console.log(data);
          console.log(locations);
        });
    }
  };

  const onFinish = (data: any) => {
    console.log(data);
  };

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

          <Form
            form={formEditProfile}
            initialValues={{ ...user }}
            layout="vertical"
            onFinish={onFinish}
          >
            <div className="form-horizontal">
              <Form.Item label="Name" name="firstName">
                <Input />
              </Form.Item>
              <Form.Item label="Surname" name="lastName">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item name="localization" label="Location">
                <AutoComplete options={locations} onChange={onLocationChange}>
                  <Input />
                </AutoComplete>
              </Form.Item>
              <Form.Item label="Date of birth" name="dateOfBirth">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Languages">
                <Select mode="multiple" allowClear placeholder="Please select">
                  <Option key="en">English</Option>
                  <Option key="pl">Polski</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item label="About you" name="description">
              <TextArea rows={4} placeholder="Write something more about you" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Save
            </Button>
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
