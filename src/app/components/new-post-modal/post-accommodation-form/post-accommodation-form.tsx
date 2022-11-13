import { UserOutlined } from "@ant-design/icons";

import { Button, DatePicker, Form, Input, Select } from "antd";
import { CreatePostInterface } from "app/interfaces/create.post.interface";
import { useEffect } from "react";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface PostAccommodationInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
  post: CreatePostInterface;
  onSubmit: (model: CreatePostInterface) => void;
  children: JSX.Element;
}

const PostAccommodationForm = ({
  onLocationSearch,
  locations,
  post,
  onSubmit,
  children,
}: PostAccommodationInterface) => {
  const [createPost] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit({
      ...post,
      type: "accommodation",
      title: values.title,
      description: values.description,
      activeFrom: values.dateRange[0].format("YYYY-MM-DD"),
      activeTo: values.dateRange[1].format("YYYY-MM-DD"),
      startPoint: values.startPoint,
      participants: values.numberOfPeople,
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
        name="startPoint"
        rules={[{ required: true, message: "Please select location" }]}
      >
        <Select
          showSearch
          options={locations}
          onSearch={onLocationSearch}
          placeholder="Please, provide where are you going"
        ></Select>
      </Form.Item>
      <Form.Item>
        <Form.Item
          style={{ display: "inline-block", width: "50%" }}
          label="Date range"
          name="dateRange"
          rules={[
            { required: true, message: "The date range field is required" },
          ]}
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
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input prefix={<UserOutlined />} />
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

export default PostAccommodationForm;
