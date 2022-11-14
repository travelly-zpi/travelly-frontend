import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CreatePostInterface } from "app/interfaces/create.post.interface";
import { useTranslation } from "react-i18next";

interface PostOtherInterface {
  onLocationSearch: (val: string) => void;
  locations: any;
  post: CreatePostInterface;
  onSubmit: (model: CreatePostInterface) => void;
  children: JSX.Element;
  loading: boolean;
}

const PostOtherForm = ({
  onLocationSearch,
  locations,
  post,
  onSubmit,
  children,
  loading
}: PostOtherInterface) => {
  const { t } = useTranslation();
  const [createPost] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit({
      ...post,
      type: "other",
      title: values.title,
      description: values.description,
      startPoint: values.location,
    });
  };

  return (
    <Form form={createPost} layout="vertical" onFinish={handleSubmit}>
      <Form.Item 
        label={t("createPost.form.title")}
        name="title"
        rules={[{ required: true, message: t("createPost.messages.title") }]}
        >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("createPost.form.location")}
        name="location"
        rules={[{ required: true, message: t("createPost.messages.location") }]}
      >
        <Select
          showSearch
          options={locations}
          onSearch={onLocationSearch}
          placeholder={t("createPost.form.locationOther")}
        ></Select>
      </Form.Item>
      <Form.Item label={t("createPost.form.desc")} name="description">
        <TextArea rows={4} placeholder={t("createPost.form.descInfo")}/>
      </Form.Item>
      {children}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
        {t("createPost.createBtn")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostOtherForm;
