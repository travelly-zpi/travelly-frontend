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
  children
}: PostTripInterface) => {
  const { i18n, t } = useTranslation();
  const [createPost] = Form.useForm();

  useEffect(() => {
    createPost.resetFields();
  });

  const handleSubmit = (values: any) => {
    onSubmit({
      ...post,
      type: "trip",
      title: values.title,
      description: values.description,
      activeFrom: values.date.format("YYYY-MM-DD"),
      startPoint: values.startPoint,
      endPoint: values.endPoint,
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
        label={"From"}
        name="startPoint"
        rules={[{ required: true, message: "Please select location" }]}
      >
        <Select
          showSearch
          options={locations}
          onSearch={onLocationSearch}
          placeholder="Please, provide your start point"
        ></Select>
      </Form.Item>
      <Form.Item
        label={"To"}
        name="endPoint"
        rules={[{ required: true, message: "Please select location" }]}
      >
        <Select
          showSearch
          options={locations}
          onSearch={onLocationSearch}
          placeholder="Please, provide your destination point"
        ></Select>
      </Form.Item>
      <Form.Item>
        <Form.Item
          style={{ display: "inline-block", width: "50%" }}
          label="Date"
          name="date"
          rules={[{ required: true, message: "The date field is required" }]}
        >
          <DatePicker />
        </Form.Item>
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
