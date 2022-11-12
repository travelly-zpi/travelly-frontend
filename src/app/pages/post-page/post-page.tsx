import "./post-page.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../../contexts/loading-context";
import axios from "axios";
import {
  Button,
  message,
  Switch,
  Typography,
  Modal,
  Avatar,
  Tag,
  Image,
} from "antd";

import { decodePost, defaultImageName } from "../../utils/post-utils";
import { PostInterface } from "../../interfaces/post.interface";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import UserContext from "../../contexts/user-context";
import moment from "moment/moment";

const { confirm } = Modal;
const { Title, Text } = Typography;
const { CheckableTag } = Tag;

const PostPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostInterface>();
  const { setLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);

  const isMyProfile = post?.author?.uuid === user?.uuid;

  const loadPost = () => {
    setLoading(true);
    axios
      .get(`/post/${id}`)
      .then((res) => {
        const data = res.data;
        decodePost(data).then((post: PostInterface) => {
          setPost(post);
        });
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setLoading]);

  const postDelete = () => {
    confirm({
      title: t("postPage.messages.deletePostConfirm"),
      okText: t("postPage.messages.deletePostConfirmYes"),
      okType: "danger",
      cancelText: t("postPage.messages.deletePostConfirmNo"),
      onOk() {
        axios
          .delete(`/post/${post?.uuid}`)
          .then(() => {
            message.success(t("postPage.messages.deleteSuccessful"));
            navigate("/user/" + post?.author?.uuid);
          })
          .catch((err) => {
            const msg = err.response?.data?.message;
            console.error(msg);
          });
      },
      centered: true,
    });
  };

  const postChangeStatus = (checked: boolean) => {
    confirm({
      title: !checked
        ? t("postPage.messages.statusConfirmInactive")
        : t("postPage.messages.statusConfirmActive"),
      okText: t("postPage.messages.statusConfirmYes"),
      cancelText: t("postPage.messages.statusConfirmNo"),
      onOk() {
        axios
          .put(`/post/${post?.uuid}/status?status=${checked}`)
          .then(() => {
            loadPost();
            message.success(t("postPage.messages.statusSuccessful"));
          })
          .catch((err) => {
            const msg = err.response?.data?.message;
            console.error(msg);
          });
      },
      centered: true,
    });
  };

  const postImages = post?.imagesUrls.map((url: string) => (
    <Image
      alt={url}
      key={url}
      src={process.env.REACT_APP_AZURE_CONTAINER_URL + url}
    />
  ));

  if (!post) {
    return null;
  }

  return (
    <div className="post-page">
      <div className="post-header">
        <div className="post-title">
          <Title level={2}>{post.title}</Title>
          {isMyProfile && (
            <div className="switch">
              <Text>
                {post.active
                  ? t("postPage.postActive")
                  : t("postPage.postInactive")}
              </Text>

              <Switch checked={post.active} onChange={postChangeStatus} />
            </div>
          )}
        </div>

        <div className="post-images-block">
          <Image.PreviewGroup>
            <Image
              className="post-main-image"
              alt={post.title}
              src={
                post.mainImageUrl
                  ? process.env.REACT_APP_AZURE_CONTAINER_URL +
                    post.mainImageUrl
                  : defaultImageName(post)
              }
            />
            <div className="post-images">{postImages}</div>
          </Image.PreviewGroup>
        </div>

        {!isMyProfile && <Title level={3}>{t("postPage.postedBy")}</Title>}
        <div className="post-author">
          <div className="post-author-info">
            {!isMyProfile && (
              <>
                {post.author?.imageUrl ? (
                  <Avatar
                    size={60}
                    src={
                      process.env.REACT_APP_AZURE_CONTAINER_URL +
                      post.author?.imageUrl
                    }
                  ></Avatar>
                ) : (
                  <Avatar
                    size={60}
                    icon={<UserOutlined></UserOutlined>}
                  ></Avatar>
                )}
                <div className="post-author-info-text">
                  <Text className="post-author-name">
                    {post.author?.firstName!} {post.author?.lastName!}
                    {", "}
                    {moment().diff(post.author?.dateOfBirth!, "years")}{" "}
                    {t("postPage.years")}
                  </Text>
                  <Text type="secondary">
                    {t("postPage.languages")}
                    {post.author?.languages?.map((lang: string) => (
                      <CheckableTag key={lang} checked={true}>
                        {lang}
                      </CheckableTag>
                    ))}
                  </Text>
                </div>
              </>
            )}
          </div>

          {isMyProfile ? (
            <div>
              <Button style={{ marginRight: "30px" }}>
                {t("postPage.edit")}
              </Button>
              <Button type="primary" onClick={postDelete}>
                {t("postPage.delete")}
              </Button>
            </div>
          ) : (
            <div>
              <Button type="primary">{t("postPage.contact")}</Button>
            </div>
          )}
        </div>
      </div>
      <div className="post-info">
        <div className="post-info-block">
          <EnvironmentOutlined></EnvironmentOutlined>
          <div className="post-info-text">
            <Text>{t("postPage.location")}</Text>
            <Text type="secondary">
              {post.startPoint + (post.endPoint ? " - " + post.endPoint : "")}
            </Text>
          </div>
        </div>
        {post.activeFrom && (
          <div className="post-info-block">
            <CalendarOutlined></CalendarOutlined>
            <div className="post-info-text">
              <Text>{t("postPage.date")}</Text>
              <Text type="secondary">
                {post.activeFrom.format("MMM d, yyyy") +
                  " - " +
                  post.activeTo.format("MMM d, yyyy")}
              </Text>
            </div>
          </div>
        )}
        {post.participants !== 0 && (
          <div className="post-info-block">
            <UserOutlined></UserOutlined>
            <div className="post-info-text">
              <Text>{t("postPage.people")}</Text>
              <Text type="secondary">{post.participants}</Text>
            </div>
          </div>
        )}
      </div>
      <div className="post-description">
        <Title level={3}>{t("postPage.description")}</Title>
        <Text className="post-description-text">{post.description}</Text>
      </div>
    </div>
  );
};

export default PostPage;
