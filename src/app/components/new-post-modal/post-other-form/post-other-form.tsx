import { DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useTranslation } from "react-i18next";

interface PostOtherInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
}

const PostOtherForm = ({ onLocationSearch, locations }: PostOtherInterface) => {
  const { i18n, t } = useTranslation();
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
          placeholder="Please, provide your location"
        ></Select>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} placeholder="Write something more here" />
      </Form.Item>
    </Form>
  );
};

export default PostOtherForm;
