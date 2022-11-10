import { UserOutlined } from "@ant-design/icons";

import { DatePicker, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

interface PostCarpoolingInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
}

const PostCarpoolingForm = ({
  onLocationSearch,
  locations,
}: PostCarpoolingInterface) => {
  const { i18n, t } = useTranslation();
  const [createPost] = Form.useForm();

  return (
    <Form form={createPost} layout="vertical">
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>
      <Form.Item
        label={"From"}
        name="location-from"
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
        name="location-to"
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
    </Form>
  );
};

export default PostCarpoolingForm;
