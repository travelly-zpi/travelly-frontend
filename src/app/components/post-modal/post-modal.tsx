import _debounce from "lodash/debounce";
import { Button, Image, message, Tabs, Typography, Upload } from "antd";
import { isEmpty, reject } from "lodash";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import moment from "moment";

import { CreatePostInterface } from "app/interfaces/create.post.interface";
import { ImageInterface } from "app/interfaces/image.interface";
import { RcFile } from "antd/lib/upload";
import LoadingContext from "app/contexts/loading-context";

import Modal from "../modal/modal";
import PostAccommodationForm from "./post-accommodation-form/post-accommodation-form";
import PostCarpoolingForm from "./post-carpooling-form/post-carpooling-form";
import PostExcursionsForm from "./post-excursions-form/post-excursions-form";
import PostOtherForm from "./post-other-form/post-other-form";
import PostTripForm from "./post-trip-form/post-trip-form";
import "./post-modal.scss";

const { Title } = Typography;

interface PostModalProps {
  onClose: Function;
  userId: string;
  postId?: string;
  onSuccess: () => void;
}

const PostModal = ({ onClose, userId, postId, onSuccess }: PostModalProps) => {
  const { i18n, t } = useTranslation();
  const [locations, setLocations] = useState();
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const [avatarFile, setAvatarFile] = useState<FormData | null>(null);
  const [fileList, setFileList] = useState<FormData[]>([]);
  const [filesToRemove, setFilesToRemove] = useState<string[]>([]);
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [mainImage, setMainImage] = useState<ImageInterface | null>(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const [post, setPost] = useState<CreatePostInterface>({
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

  useEffect(() => {
    if (!postId) {
      return;
    }

    axios.get(`/post/${postId}`)
      .then(({ data: { mainImage, images, ...rest } }) => {
        setImages(images);
        setMainImage(mainImage);
        setPost({
          ...rest,
          author: rest.author.uuid,
          activeFrom: moment(rest.activeFrom),
          activeTo: moment(rest.activeTo),
        });
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      });
  }, [postId]);

  const onSubmit = (model: CreatePostInterface) => {
    setLoading(true);

    const url = postId ? `/post/${postId}` : "/post/";

    axios[postId ? "put" : "post"](url, model)
      .then(async (res) => {
        const data = res.data;
        const id = data.uuid;

        if (avatarFile && mainImage) {
          await axios.put(`/post/${id}/attachmentDelete`, null, { params: { attachmentUuid: mainImage.attachmentUuid } })
            .catch((err) => {
              const msg = err.response?.data?.message;
              console.error(msg);
            });
        }

        if (avatarFile) {
          await axios.put(`/post/${id}/attachmentUpload?status=true`, avatarFile)
            .catch((err) => {
              const msg = err.response?.data?.message;
              console.error(msg);
            })
        }

        if (!isEmpty(filesToRemove)) {
          const promises = filesToRemove.map((attachmentUuid) => (
            axios.put(`/post/${id}/attachmentDelete`, null, { params: { attachmentUuid } })
              .catch((err) => reject(err))
          ));

          await Promise.all(promises);
        }

        if (!isEmpty(fileList)) {
          const promises = fileList.map((fd) => (
            axios.put(`/post/${id}/attachmentUpload?status=false`, fd)
              .catch((err) => reject(err))
          ));

          await Promise.all(promises);
        }

        message.success(postId ? t("createPost.messages.successEdit") : t("createPost.messages.success"));
        onSuccess();
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

  const beforeUpload = useCallback((file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(t("editProfile.errors.avatarOnlyJpgPng"));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(t("editProfile.errors.avatarSmaller2MB"));
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;;
  }, [t]);

  const setImage = ({ onSuccess, file }: any) => {
    const fd = new FormData();
    fd.append("image", file);
    setAvatarFile(fd);
    onSuccess();
  };

  const setAttachment = useCallback(({ onSuccess, file }: any) => {
    const fd = new FormData();
    fd.append("image", file);
    setFileList([...fileList, fd]);
    onSuccess();
  }, [fileList]);

  const uploadMultipleImg = useMemo(() => {
    const defaultFileList = images.map(({ attachmentUuid, url }) => ({
      uid: attachmentUuid,
      url: `${process.env.REACT_APP_AZURE_CONTAINER_URL}${url}`,
      name: url,
    }));

    return (
      <Upload
        name="avatar"
        listType="picture-card"
        defaultFileList={defaultFileList}
        onRemove={({ uid }) => setFilesToRemove(list => [...list, uid])}
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
  }, [beforeUpload, images, setAttachment, t]);

  const forms = [
    {
      label: t("createPost.accommodation"),
      key: "accommodation",
      disabled: !!postId && post.type !== "accommodation",
      children: (
        <PostAccommodationForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          editMode={!!postId}
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
      disabled: !!postId && post.type !== "carpooling",
      children: (
        <PostCarpoolingForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          editMode={!!postId}
          onSubmit={onSubmit}
          loading={loading}
        >
          {uploadMultipleImg}
        </PostCarpoolingForm>
      ),
    },
    {
      label: t("createPost.trip"),
      key: "trip",
      disabled: !!postId && post.type !== "trip",
      children: (
        <PostTripForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          editMode={!!postId}
          onSubmit={onSubmit}
          loading={loading}
        >
          {uploadMultipleImg}
        </PostTripForm>
      ),
    },
    {
      label: t("createPost.excursion"),
      key: "excursion",
      disabled: !!postId && post.type !== "excursion",
      children: (
        <PostExcursionsForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          editMode={!!postId}
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
      disabled: !!postId && post.type !== "other",
      children: (
        <PostOtherForm
          onLocationSearch={debounceOnLocationSearch}
          locations={locations}
          post={post}
          editMode={!!postId}
          onSubmit={onSubmit}
          loading={loading}
        >
          {uploadMultipleImg}
        </PostOtherForm>
      ),
    },
  ];

  const mainImagePreview = avatarPreview ?? (
    mainImage 
      ? `${process.env.REACT_APP_AZURE_CONTAINER_URL}${mainImage?.url}` 
      : undefined
    );

  return (
    <div className="post-wrapper">
      <Modal onClose={onClose} size="large">
        <div className="post-container">
          <Title className="title" level={3}>
            {postId ? t("post.editPost") : t("createPost.modalTitle")}
          </Title>
          <div className="post-form">
            <Tabs activeKey={postId ? post.type : undefined} items={forms}></Tabs>
            <div className="post-avatar">
              <Image src={mainImagePreview} width={250} height={150} placeholder />
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

export default PostModal;
