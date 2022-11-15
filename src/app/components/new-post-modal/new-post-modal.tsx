import "./new-post-modal.scss";
import Modal from "../modal/modal";

import { Button, Image, message, Tabs, Typography, Upload } from "antd";

import { useCallback, useContext, useState } from "react";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import PostAccommodationForm from "./post-accommodation-form/post-accommodation-form";
import axios from "axios";
import { useTranslation } from "react-i18next";
import _debounce from "lodash/debounce";
import PostCarpoolingForm from "./post-carpooling-form/post-carpooling-form";
import PostExcursionsForm from "./post-excursions-form/post-excursions-form";
import PostTripForm from "./post-trip-form/post-trip-form";
import PostOtherForm from "./post-other-form/post-other-form";
import { CreatePostInterface } from "app/interfaces/create.post.interface";
import LoadingContext from "app/contexts/loading-context";
import { RcFile } from "antd/lib/upload";
import { isEmpty, reject } from "lodash";

const { Title } = Typography;

interface CreatePostModalProps {
  onClose: Function;
  userId: string;
  afterCreate: () => void;
}

const CreatePostModal = ({ onClose, userId, afterCreate }: CreatePostModalProps) => {
  const { i18n, t } = useTranslation();
  const [locations, setLocations] = useState();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const [avatarFile, setAvatarFile] = useState<FormData | null>(null);
  const [fileList, setFileList] = useState<FormData[]>([]);
  const { loading, setLoading } = useContext(LoadingContext);
  const [post] = useState<CreatePostInterface>({
    title: "",
    description: "",
    activeFrom: null,
    activeTo: null,
    type: "",
    active: true,
    participants: null,
    startPoint: null,
    endPoint: null,
    author: userId,
  });

  const onSubmit = (model: CreatePostInterface) => {
    setLoading(true);
    axios
      .post("/post/", model)
      .then((res) => {
        const data = res.data;
        const id = data.uuid;
        console.log(data);
        if (avatarFile) {
          axios
            .put(`/post/${id}/attachmentUpload?status=true`, avatarFile)
            .then((r) => {
              //message.success("avatar uploaded");
            })
            .catch((err) => {
              const msg = err.response?.data?.message;
              console.error(msg);
            });
        }
        if (!isEmpty(fileList)) {
          let promises = fileList.map((fd) => (
            axios.put(`/post/${id}/attachmentUpload?status=false`, fd)
              .catch((err) => reject(err))
          ));
          Promise.all(promises).then((r) => console.log(r), (reason) => console.log(reason));
        }
        message.success(t("createPost.messages.success"));
        afterCreate();
        onClose();
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      })
      .finally(() => setLoading(false));
  };

  //location find function
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

  const handleChange = ({ file }: any) => {
    if (file.status === "removed") setAvatarPreview(undefined);
    else setAvatarPreview(URL.createObjectURL(file.originFileObj));
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(t("editProfile.errors.avatarOnlyJpgPng"));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(t("editProfile.errors.avatarSmaller2MB"));
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;;
  };

  const setImage = ({ onSuccess, file }: any) => {
    const fd = new FormData();
    fd.append("image", file);
    setAvatarFile(fd);
    onSuccess();
  };

  const setAttachment = ({ onSuccess, file }: any) => {
    const fd = new FormData();
    fd.append("image", file);
    setFileList([...fileList, fd]);
    onSuccess();
  };

  const uploadMultipleImg = (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      customRequest={setAttachment}
      beforeUpload={beforeUpload}
    >
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>{t("createPost.uploadImg")}</div>
      </div>
    </Upload>
  );

  const forms = [
    {
      label: t("createPost.accommodation"),
      key: "accommodation",
      children: (
        <PostAccommodationForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          onSubmit={onSubmit}
          loading={loading}
        >
          {uploadMultipleImg}
        </PostAccommodationForm>
      ),
    },
    {
      label: t("createPost.carpooling"),
      key: "carpooling",
      children: (
        <PostCarpoolingForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          onSubmit={onSubmit}
          loading={loading}
        >
          {uploadMultipleImg}
        </PostCarpoolingForm>
      ),
    },
    {
      label: t("createPost.trip"),
      key: "trip-together",
      children: (
        <PostTripForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          onSubmit={onSubmit}
          loading={loading}
        >
          {uploadMultipleImg}
        </PostTripForm>
      ),
    },
    {
      label: t("createPost.excursion"),
      key: "excursions",
      children: (
        <PostExcursionsForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          onSubmit={onSubmit}
          loading={loading}
        >
          {uploadMultipleImg}
        </PostExcursionsForm>
      ),
    },
    {
      label: t("createPost.other"),
      key: "other",
      children: (
        <PostOtherForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          onSubmit={onSubmit}
          loading={loading}
        >
          {uploadMultipleImg}
        </PostOtherForm>
      ),
    },
  ];

  return (
    <div className="fff">
      <Modal onClose={onClose} size="large">
        <div className="create-post-container">
          <Title className="title" level={3}>
            {t("createPost.modalTitle")}
          </Title>
          <div className="create-post-form">
            <Tabs items={forms}></Tabs>
            <div className="create-post-avatar">
              <Image src={avatarPreview} width={250} height={150} placeholder />
              <div style={{ maxWidth: "195px" }}>
                <Upload
                  maxCount={1}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                  customRequest={setImage}
                >
                  <Button icon={<UploadOutlined />}>{t("createPost.uploadAvatar")}</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
