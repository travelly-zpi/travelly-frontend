import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { PostInterface } from "app/interfaces/post.interface";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PostOtherInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
  post: PostInterface;
  onSubmit: (model: PostInterface) => void;
}

const PostOtherForm = ({ onLocationSearch, locations , post, onSubmit}: PostOtherInterface) => {
  const { i18n, t } = useTranslation();
  const [createPost] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit({
      ...post, 
      type: "other",
      title: values.title,
      description: values.description,
      startPoint: values.location,
    });
  }

  return (
    <Form form={createPost} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
      <Form.Item
        label={"Location"}
        name="location"
        rules={[{ required: true, message: "Please select location" }]}
      >
        <Select
          showSearch
          options={locations}
          onSearch={onLocationSearch}
          placeholder="Please, provide your location"
        ></Select>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} placeholder="Write something more here" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostOtherForm;