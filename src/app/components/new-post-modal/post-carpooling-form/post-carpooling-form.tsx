import { UserOutlined } from "@ant-design/icons";

import { Button, DatePicker, Form, Input, Select } from "antd";
import { PostInterface } from "app/interfaces/post.interface";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

interface PostCarpoolingInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
  post: PostInterface;
  onSubmit: (model: PostInterface) => void;
}

const PostCarpoolingForm = ({
  onLocationSearch,
  locations,
  post,
  onSubmit
}: PostCarpoolingInterface) => {
  const { i18n, t } = useTranslation();
  const [createPost] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit({
      ...post,
      type: "carpooling",
      title: values.title,
      description: values.description,
      activeFrom: values.date.format("YYYY-MM-DD"),
      startPoint: values.startPoint,
      endPoint: values.endPoint,
      participants: values.numberOfPeople,
    });
  };

  return (
    <Form form={createPost} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Title" name="title">
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostCarpoolingForm;
