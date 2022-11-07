import "./new-post-modal.scss";

import Modal from "../modal/modal";

import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Tabs,
  Typography,
  Upload,
} from "antd";

import { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const { Title } = Typography;
const { TextArea } = Input;

interface CreatePostModalProps {
  onClose: Function;
}

const CreatePostModal = ({ onClose }: CreatePostModalProps) => {
  const [createPost] = Form.useForm();
  const [locations] = useState();
  const [avatarPreview, setAvatarPreview] = useState<string>();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const forms = [
    {
      label: "Accomodation",
      key: "accomodation",
      children: (
        <Form form={createPost} layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item name="localization" label="Location">
            <AutoComplete options={locations}>
              <Input placeholder="Please, provide where you are" />
            </AutoComplete>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{ display: "inline-block", width: "50%" }}
              label="Date range"
              name="dateRange"
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "30%",
                marginLeft: "10px",
              }}
              label="Number of people"
              name="numberOfPeople"
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Write something more here" />
          </Form.Item>
          <FormItem>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              action="/"
            >
              {uploadButton}
            </Upload>
          </FormItem>
        </Form>
      ),
    },
    {
      label: "Carpooling",
      key: "carpooling",
      children: (
        <Form form={createPost} layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item name="localization-from" label="From">
            <AutoComplete options={locations}>
              <Input placeholder="Please, provide where your start point" />
            </AutoComplete>
          </Form.Item>
          <Form.Item name="localization-to" label="To">
            <AutoComplete options={locations}>
              <Input placeholder="Please, provide yor destination point" />
            </AutoComplete>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{ display: "inline-block", width: "50%" }}
              label="Date"
              name="date"
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              style={{
                display: "inline-block",
                width: "30%",
                marginLeft: "10px",
              }}
              label="Number of people"
              name="numberOfPeople"
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Write something more here" />
          </Form.Item>
          <FormItem>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              action="/"
            >
              {uploadButton}
            </Upload>
          </FormItem>
        </Form>
      ),
    },
    {
      label: "Trip together",
      key: "trip-together",
      children: (
        <Form form={createPost} layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item name="localization-from" label="From">
            <AutoComplete options={locations}>
              <Input placeholder="Please, provide where your start point" />
            </AutoComplete>
          </Form.Item>
          <Form.Item name="localization-to" label="To">
            <AutoComplete options={locations}>
              <Input placeholder="Please, provide yor destination point" />
            </AutoComplete>
          </Form.Item>
          <Form.Item>
            <Form.Item
              style={{ display: "inline-block", width: "50%" }}
              label="Date"
              name="date"
            >
              <DatePicker />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Write something more here" />
          </Form.Item>
          <FormItem>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              action="/"
            >
              {uploadButton}
            </Upload>
          </FormItem>
        </Form>
      ),
    },
    {
      label: "Excursions",
      key: "excursions",
      children: (
        <Form form={createPost} layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item name="localization" label="Location">
            <AutoComplete options={locations}>
              <Input placeholder="Please, provide where you are going" />
            </AutoComplete>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Write something more here" />
          </Form.Item>
          <FormItem>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              action="/"
            >
              {uploadButton}
            </Upload>
          </FormItem>
        </Form>
      ),
    },
    {
      label: "Other",
      key: "other",
      children: (
        <Form form={createPost} layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item name="localization" label="Location">
            <AutoComplete options={locations}>
              <Input placeholder="Please, provide your location" />
            </AutoComplete>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} placeholder="Write something more here" />
          </Form.Item>
          <FormItem>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              action="/"
            >
              {uploadButton}
            </Upload>
          </FormItem>
        </Form>
      ),
    },
  ];

  const handleChange = ({ file }: any) => {
    setAvatarPreview(URL.createObjectURL(file.originFileObj));
  };

  return (
    <div className="fff">
      <Modal onClose={onClose} size="large">
        <div className="create-post-container">
          <Title className="title" level={3}>
            Create new post
          </Title>
          <div className="create-post-form">
            <Tabs items={forms}></Tabs>
            <div className="create-post-avatar">
              <Image src={avatarPreview} width={250} height={150} placeholder />
              <div style={{ maxWidth: "195px" }}>
                <Upload maxCount={1} onChange={handleChange}>
                  <Button icon={<UploadOutlined />}>Upload main image</Button>
                </Upload>
              </div>
            </div>
          </div>
          <Button className="submitButton" type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
