import { UserOutlined } from "@ant-design/icons";

import { Button, DatePicker, Form, Input, Select } from "antd";
import { CreatePostInterface } from "app/interfaces/create.post.interface";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface PostAccommodationInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
  post: CreatePostInterface;
  editMode?: boolean;
  onSubmit: (model: CreatePostInterface) => void;
  children: JSX.Element;
  loading: boolean;
}

const PostAccommodationForm = ({
  onLocationSearch,
  locations,
  post,
  editMode,
  onSubmit,
  children,
  loading
}: PostAccommodationInterface) => {
  const { t } = useTranslation();

  const handleSubmit = (values: any) => {
    onSubmit({
      ...post,
      type: "accommodation",
      title: values.title,
      description: values.description,
      activeFrom: values.dateRange[0].format("YYYY-MM-DD"),
      activeTo: values.dateRange[1].format("YYYY-MM-DD"),
      startPoint: values.startPoint,
      participants: values.participants,
    });
  };

  const initialValues = {
    ...post,
    dateRange: [post.activeFrom, post.activeTo],
  };

  return (
    <Form initialValues={initialValues} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label= {t("createPost.form.title")}
        name="title"
        rules={[{ required: true, message: t("createPost.messages.title") }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("createPost.form.location")}
        name="startPoint"
        rules={[{ required: true, message: t("createPost.messages.location") }]}
      >
        <Select
          showSearch
          options={locations}
          onSearch={onLocationSearch}
          placeholder={t("createPost.form.locationInfo")}
        ></Select>
      </Form.Item>
      <Form.Item>
        <Form.Item
          style={{ display: "inline-block", width: "50%" }}
          label={t("createPost.form.dateR")}
          name="dateRange"
          rules={[
            { required: true, message: t("createPost.messages.dateR")  },
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
          label={t("createPost.form.numb")}
          name="participants"
          rules={[{ required: true, message: t("createPost.messages.require") }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
      </Form.Item>
      <Form.Item 
        label={t("createPost.form.desc")}
        name="description"
      >
        <TextArea rows={4} placeholder={t("createPost.form.descInfo")} />
      </Form.Item>
      {children}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} data-testid="submit-create-button">
          {editMode ? t("createPost.editBtn") : t("createPost.createBtn")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostAccommodationForm;
