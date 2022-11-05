import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Typography,
  Upload,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import * as React from "react";
import { RcFile } from "antd/es/upload";
import { UserDtoInterface } from "../../../interfaces/user-dto.interface";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../../../contexts/user-context";
import { UserInterface } from "../../../interfaces/user.interface";
import { useTranslation } from "react-i18next";
import { getLangNameFromCode, getLangCodeList } from "language-name-map";
import _debounce from "lodash/debounce";

import "./user-info-form.scss";
import LoadingContext from "../../../contexts/loading-context";
import ImgCrop from "antd-img-crop";

const { Text } = Typography;
const { TextArea } = Input;

interface UserInfoFormProps {
  user: UserInterface;
  onClose: Function;
}

const UserInfoForm = ({ user, onClose }: UserInfoFormProps) => {
  const { i18n, t } = useTranslation();
  const [form] = Form.useForm();
  const { encodeUser } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [locations, setLocations] = useState();
  const [languages, setLanguages] = useState<any>();

  useEffect(() => {
    const languages = getLangCodeList().map((code: string) => {
      const name = getLangNameFromCode(code)?.name;
      return {
        label: name,
        value: name,
        key: name,
      };
    });

    setLanguages(languages);
  }, []);

  const onSubmit = (values: UserInterface) => {
    const dto: UserDtoInterface = encodeUser(values);

    setLoading(true);
    axios
      .put("/user/", {
        uuid: user.uuid,
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth,
        description: dto.description,
        email: user.email,
        languages: dto.languages,
        localisation: dto.localisation,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        message.success("Your profile information was successfully saved!");
        onClose();
      })
      .catch((err) => {
        setLoading(false);
        const msg = err.response?.data?.message;
        console.error(msg);
      });
  };

  const onLocationSearch = (val: string) => {
    if (val) {
      const axiosNoAuth = axios.create();
      delete axiosNoAuth.defaults.headers.common["Authorization"];
      axiosNoAuth.defaults.baseURL = "https://api.mapbox.com/geocoding/v5/";

      axiosNoAuth
        .get(
          `mapbox.places/${val}.json?limit=10&proximity=ip&types=place&language=${
            i18n.language + (i18n.language !== "en" ? ",en" : "")
          }&access_token=pk.eyJ1IjoibmF6YXJwZWNoa2EiLCJhIjoiY2w5enN2ZzA2MGowMTNzcGJ4ZXpzNWwxYyJ9.oLwYVz9bpUTbT7hC20B5_w`,
          {}
        )
        .then(({ data }) => {
          const locations = data.features.map((feature: any) => ({
            label: feature.place_name,
            value: feature.place_name_en,
            key: feature.place_name_en,
          }));

          setLocations(locations);
          console.log({ data, locations });
        });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceOnLocationSearch = useCallback(
    _debounce(onLocationSearch, 400),
    []
  );

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadImage = ({ onSuccess, onError, file }: any) => {
    const fd = new FormData();
    fd.append("image", file);

    setLoading(true);
    axios
      .put(`/user/${user.uuid}/uploadProfileImage`, fd)
      .then(() => {
        message.success("Avatar successfully updated!");
        onSuccess();
        onClose();
      })
      .catch((err) => {
        message.error(err.message);
        onError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const removeImage = () => {
    setLoading(true);
    axios
      .put(`/user/${user.uuid}/removeProfileImage`)
      .then(() => {
        message.success("Avatar successfully removed!");
        onClose();
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="user-info-form">
      <div className="avatar-block">
        {user.imageUrl ? (
          <Avatar
            size={128}
            src={process.env.REACT_APP_AZURE_CONTAINER_URL + user.imageUrl}
          />
        ) : (
          <Avatar size={128} icon={<UserOutlined></UserOutlined>} />
        )}

        <ImgCrop>
          <Upload
            accept="image/png, image/jpeg"
            maxCount={1}
            showUploadList={false}
            customRequest={uploadImage}
            beforeUpload={beforeUpload}
          >
            <Button type="primary">{t("editProfile.newAvatar")}</Button>
          </Upload>
        </ImgCrop>

        {user.imageUrl && (
          <Popconfirm
            title="Are you sure to remove your avatar?"
            onConfirm={removeImage}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <Text type="danger">{t("editProfile.removeAvatar")}</Text>
            </Button>
          </Popconfirm>
        )}
      </div>

      <Form
        form={form}
        initialValues={{
          ...user,
        }}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
      >
        <Form.Item
          label={t("editProfile.firstName")}
          name="firstName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("editProfile.lastName")}
          name="lastName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("editProfile.email")} name="email">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label={t("editProfile.location")}
          name="localisation"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            options={locations}
            onSearch={debounceOnLocationSearch}
          ></Select>
        </Form.Item>
        <Form.Item
          label={t("editProfile.dateOfBirth")}
          name="dateOfBirth"
          rules={[{ required: true }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format={"YYYY-MM-DD"}
            disabledDate={(date) => date && date > moment().subtract(18, "y")}
          />
        </Form.Item>
        <Form.Item
          label={t("editProfile.languages")}
          name="languages"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            mode="multiple"
            allowClear
            placeholder="Please select"
            options={languages}
            filterOption={(input: string, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            maxTagCount="responsive"
          ></Select>
        </Form.Item>

        <Form.Item
          label={t("editProfile.aboutYou")}
          name="description"
          className="about-you"
          rules={[{ required: true }]}
        >
          <TextArea
            rows={4}
            placeholder={t("editProfile.aboutYouPlaceholder")}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          {t("editProfile.save")}
        </Button>
      </Form>
    </div>
  );
};

export default UserInfoForm;
