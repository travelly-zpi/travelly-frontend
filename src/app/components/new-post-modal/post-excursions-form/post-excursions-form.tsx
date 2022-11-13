import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CreatePostInterface } from "app/interfaces/create.post.interface";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface PostTripInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
  post: CreatePostInterface;
  onSubmit: (model: CreatePostInterface) => void;
  children: JSX.Element;
}

const PostTripForm = ({
  onLocationSearch,
  locations,
  post,
  onSubmit,
  children,
}: PostTripInterface) => {
  const { i18n, t } = useTranslation();
  const [createPost] = Form.useForm();

  useEffect(() => {
    createPost.resetFields();
  });

  const handleSubmit = (values: any) => {
    onSubmit({
      ...post,
      type: "excursion",
      title: values.title,
      description: values.description,
      startPoint: values.location,
    });
  };

  return (
    <Form form={createPost} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "The title field is required" }]}
      >
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
          placeholder="Please, provide where are you going"
        ></Select>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} placeholder="Write something more here" />
      </Form.Item>
      {children}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostTripForm;
