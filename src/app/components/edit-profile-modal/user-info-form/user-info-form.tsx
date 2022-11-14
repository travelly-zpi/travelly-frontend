import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
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
import { UserInterface } from "../../../interfaces/user.interface";
import { useTranslation } from "react-i18next";
import { getLangNameFromCode, getLangCodeList } from "language-name-map";
import _debounce from "lodash/debounce";

import "./user-info-form.scss";
import LoadingContext from "../../../contexts/loading-context";
import ImgCrop from "antd-img-crop";
import { encodeUser } from "../../../utils/user-utils";

const { Text } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

interface UserInfoFormProps {
  onClose: Function;
  user: UserInterface;
}

const UserInfoForm = ({ onClose, user }: UserInfoFormProps) => {
  const { i18n, t } = useTranslation();
  const [form] = Form.useForm();
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
        message.success(t("editProfile.messages.profileUpdated"));
        onClose();
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      })
      .finally(() => setLoading(false));
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
          }&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
          {}
        )
        .then(({ data }) => {
          const locations = data.features.map((feature: any) => ({
            label: feature.place_name,
            value: feature.place_name_en,
            key: feature.place_name_en,
          }));

          setLocations(locations);
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
      message.error(t("editProfile.errors.avatarOnlyJpgPng"));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(t("editProfile.errors.avatarSmaller2MB"));
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
        message.success(t("editProfile.messages.avatarUpdated"));
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
    confirm({
      title: t("editProfile.messages.avatarConfirm"),
      okText: t("editProfile.messages.avatarConfirmYes"),
      cancelText: t("editProfile.messages.avatarConfirmNo"),
      onOk() {
        setLoading(true);
        axios
          .put(`/user/${user.uuid}/removeProfileImage`)
          .then(() => {
            message.success(t("editProfile.messages.avatarRemoved"));
            onClose();
          })
          .catch((err) => {
            message.error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      },
      centered: true,
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
          <Button>
            <Text type="danger" onClick={removeImage}>
              {t("editProfile.removeAvatar")}
            </Text>
          </Button>
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
          rules={[
            { required: true, message: t("editProfile.errors.noFirstName") },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("editProfile.lastName")}
          name="lastName"
          rules={[
            { required: true, message: t("editProfile.errors.noLastName") },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("editProfile.email")} name="email">
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label={t("editProfile.location")}
          name="localisation"
          rules={[
            { required: true, message: t("editProfile.errors.noLocation") },
          ]}
        >
          <Select
            showSearch
            options={locations}
            onSearch={debounceOnLocationSearch}
            notFoundContent={t("editProfile.messages.noLocations")}
          ></Select>
        </Form.Item>
        <Form.Item
          label={t("editProfile.dateOfBirth")}
          name="dateOfBirth"
          rules={[
            { required: true, message: t("editProfile.errors.noDateOfBirth") },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format={"YYYY-MM-DD"}
            placeholder={t("editProfile.dateOfBirthPlaceholder")}
            disabledDate={(date) => date && date > moment().subtract(18, "y")}
          />
        </Form.Item>
        <Form.Item
          label={t("editProfile.languages")}
          name="languages"
          rules={[
            { required: true, message: t("editProfile.errors.noLanguages") },
          ]}
        >
          <Select
            showSearch
            mode="multiple"
            allowClear
            placeholder={t("editProfile.languagesPlaceholder")}
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
