import { UserOutlined } from "@ant-design/icons";

import { DatePicker, Form, Input, Select } from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface PostAccommodationInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
}

const PostAccommodationForm = ({
  onLocationSearch,
  locations,
}: PostAccommodationInterface) => {
  const [createPost] = Form.useForm();

  return (
    <Form form={createPost} layout="vertical">
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
          placeholder="Please, provide where are you going"
        ></Select>
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
    </Form>
  );
};

export default PostAccommodationForm;
