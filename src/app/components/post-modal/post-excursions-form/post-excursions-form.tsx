import { Button, Form, Input, Select } from "antd";
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
      type: "excursion",
      title: values.title,
      description: values.description,
      startPoint: values.startPoint,
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
      <Form.Item label={t("createPost.form.desc")} name="description">
        <TextArea rows={4} placeholder={t("createPost.form.descInfo")} />
      </Form.Item>
      {children}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {editMode ? t("createPost.editBtn") : t("createPost.createBtn")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostTripForm;
