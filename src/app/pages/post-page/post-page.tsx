import "./post-page.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Skeleton,
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
import PostModal from "../../components/post-modal/post-modal";
import { reject } from "lodash";

const { confirm } = Modal;
const { Title, Text } = Typography;
const { CheckableTag } = Tag;

const PostPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostInterface>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const { setLoading } = useContext(LoadingContext);
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const openEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handlePostUpdate = () => {
    loadPost();
    closeEditModal();
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

  const postImages = post?.images.map((url: string) => (
    <Image
      alt={url}
      key={url}
      src={process.env.REACT_APP_AZURE_CONTAINER_URL + url}
    />
  ));

  const contactWithOwner = () => {
    const params: any = {
      sender: user?.uuid,
      recipient: post?.author?.uuid,
    };
    axios
      .get("/chat", { params })
      .then(({ data }) => {
        sessionStorage.setItem("chatContact", data);
        navigate("/messages");
      })
      .catch((err) => reject(err));
  };

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

              <Switch
                checked={post.active}
                onChange={postChangeStatus}
                data-testid="switch-status-post-page"
              />
            </div>
          )}
        </div>

        <div className="post-images-block">
          <Image.PreviewGroup>
            <>
              {!imageLoaded && (
                <Skeleton.Image active={true} className="post-main-image" />
              )}
              <Image
                className="post-main-image"
                alt={post.title}
                src={
                  post.mainImage
                    ? process.env.REACT_APP_AZURE_CONTAINER_URL + post.mainImage
                    : defaultImageName(post)
                }
                style={{ height: imageLoaded ? "400px" : "0" }}
                onLoad={() => setImageLoaded(true)}
              />
            </>
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
                      post.author?.imageUrl +
                      "?date=" +
                      post.author?.imageCreationDate
                    }
                  ></Avatar>
                ) : (
                  <Avatar
                    size={60}
                    icon={<UserOutlined></UserOutlined>}
                  ></Avatar>
                )}
                <div className="post-author-info-text">
                  <Link to={"/user/" + post.author?.uuid}>
                    <Text className="post-author-name">
                      {post.author?.firstName!} {post.author?.lastName!}
                      {", "}
                      {moment().diff(post.author?.dateOfBirth!, "years")}{" "}
                      {t("postPage.years")}
                    </Text>
                  </Link>

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
              <Button
                style={{ marginRight: "30px" }}
                onClick={openEditModal}
                data-testid="edit-button-post-page"
              >
                {t("postPage.edit")}
              </Button>
              <Button
                type="primary"
                onClick={postDelete}
                data-testid="delete-button-post-page"
              >
                {t("postPage.delete")}
              </Button>
            </div>
          ) : (
            <div>
              <Button type="primary" onClick={contactWithOwner}>
                {t("postPage.contact")}
              </Button>
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
                {post.activeFrom.format("MMM Do, yyyy") +
                  (post.activeTo
                    ? " - " + post.activeTo.format("MMM Do, yyyy")
                    : "")}
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
      {isEditModalVisible && user && (
        <PostModal
          userId={user.uuid}
          postId={post.uuid}
          onClose={closeEditModal}
          onSuccess={handlePostUpdate}
        />
      )}
    </div>
  );
};

export default PostPage;
