import { Button, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CreatePostInterface } from "app/interfaces/create.post.interface";
import { useTranslation } from "react-i18next";

interface PostTripInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
  post: CreatePostInterface;
  editMode?: boolean;
  onSubmit: (model: CreatePostInterface) => void;
  children: JSX.Element;
  loading: boolean;
}

const PostTripForm = ({
  onLocationSearch,
  locations,
  post,
  editMode,
  onSubmit,
  children,
  loading
}: PostTripInterface) => {
  const { t } = useTranslation();

  const handleSubmit = (values: any) => {
    onSubmit({
      ...post,
      type: "trip",
      title: values.title,
      description: values.description,
      activeFrom: values.activeFrom.format("YYYY-MM-DD"),
      startPoint: values.startPoint,
      endPoint: values.endPoint,
    });
  };

  return (
    <Form initialValues={post} layout="vertical" onFinish={handleSubmit}>
      <Form.Item 
        label={t("createPost.form.title")}
        name="title"
        rules={[{ required: true, message: t("createPost.messages.title") }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("createPost.form.from")}
        name="startPoint"
        rules={[{ required: true, message: t("createPost.messages.location") }]}
      >
        <Select
          showSearch
          options={locations}
          onSearch={onLocationSearch}
          placeholder={t("createPost.form.locationFrom")}
        ></Select>
      </Form.Item>
      <Form.Item
        label={t("createPost.form.to")}
        name="endPoint"
        rules={[{ required: true, message: t("createPost.messages.location") }]}
      >
        <Select
          showSearch
          options={locations}
          onSearch={onLocationSearch}
          placeholder={t("createPost.form.locationTo")}
        ></Select>
      </Form.Item>
      <Form.Item>
        <Form.Item
          style={{ display: "inline-block", width: "50%" }}
          label={t("createPost.form.date")}
          name="activeFrom"
          rules={[{ required: true, message: t("createPost.messages.date") }]}
        >
          <DatePicker />
        </Form.Item>
      </Form.Item>
      <Form.Item label={t("createPost.form.desc")} name="description">
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

export default PostTripForm;
