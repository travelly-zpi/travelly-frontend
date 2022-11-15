import "./user-posts.scss";
import { message, Pagination, Tabs, Typography, Modal, Button } from "antd";
import Post from "../post/post";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../../contexts/loading-context";
import axios from "axios";
import { UserInterface } from "../../interfaces/user.interface";
import ClipartNoResults from "../../assets/img/clipart-no-results";
import { PostPreviewInterface } from "../../interfaces/post-preview.interface";
import { useTranslation } from "react-i18next";
import { PostParamsInterface } from "../../interfaces/post-params-interface";
import CreatePostModal from "../new-post-modal/new-post-modal";

const { Title } = Typography;
const { confirm } = Modal;

interface UserPostsProps {
  user: UserInterface;
  isMyProfile: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const UserPosts = ({
  user,
  isMyProfile,
  openModal,
  closeModal,
}: UserPostsProps) => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPosts, setTotalPosts] = useState(1);
  const [modal, setModal] = useState(false);
  const { setLoading } = useContext(LoadingContext);

  const loadPosts = () => {
    const params: PostParamsInterface = {
      author: user.uuid,
      active: active,
      page: page,
      size: pageSize,
    };

    setLoading(true);
    axios
      .get(`/post`, {
        params,
      })
      .then((res) => {
        const data = res.data;
        setPosts(data.posts);
        setTotalPosts(data.count);
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, active, page, pageSize]);

  const onTabChange = () => {
    setActive(!active);
    setPage(1);
    setTotalPosts(1);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const modalOpen = () => {
    setModal(true);
    openModal();
  };

  const modalClose = () => {
    setModal(false);
    closeModal();
  };

  const postDelete = (post: PostPreviewInterface) => {
    confirm({
      title: t("userPosts.messages.deletePostConfirm"),
      okText: t("userPosts.messages.deletePostConfirmYes"),
      okType: "danger",
      cancelText: t("userPosts.messages.deletePostConfirmNo"),
      onOk() {
        axios
          .delete(`/post/${post.uuid}`)
          .then(() => {
            loadPosts();
            message.success(t("userPosts.messages.deleteSuccessful"));
          })
          .catch((err) => {
            const msg = err.response?.data?.message;
            console.error(msg);
          });
      },
      centered: true,
    });
  };

  const postChangeStatus = (post: PostPreviewInterface) => {
    confirm({
      title: active
        ? t("userPosts.messages.statusConfirmInactive")
        : t("userPosts.messages.statusConfirmActive"),
      okText: t("userPosts.messages.statusConfirmYes"),
      cancelText: t("userPosts.messages.statusConfirmNo"),
      onOk() {
        axios
          .put(`/post/${post.uuid}/status?status=${!active}`)
          .then((res) => {
            console.log(res);
            loadPosts();
            message.success(t("userPosts.messages.statusSuccessful"));
          })
          .catch((err) => {
            const msg = err.response?.data?.message;
            console.error(msg);
          });
      },
      centered: true,
    });
  };

  const postsDiv =
    posts.length > 0 ? (
      <div className="user-posts">
        <div className="posts-block">
          {posts?.map((post: PostPreviewInterface) => (
            <Post
              post={post}
              key={post.uuid}
              onDelete={() => postDelete(post)}
              onChangeStatus={() => postChangeStatus(post)}
              isMyProfile={isMyProfile}
              active={active}
            ></Post>
          ))}
        </div>

        <Pagination
          current={page}
          onChange={onPaginationChange}
          pageSize={pageSize}
          total={totalPosts}
          showSizeChanger={true}
          pageSizeOptions={[3, 9, 18, 27]}
        />
      </div>
    ) : (
      <div className="user-posts">
        <ClipartNoResults></ClipartNoResults>
        <Title level={3}>
          {isMyProfile
            ? t("userPosts.noPostsMine")
            : user.firstName + t("userPosts.noPosts")}
        </Title>
      </div>
    );

  const tabs = [
    {
      label: t("userPosts.active"),
      key: "active",
      children: postsDiv,
    },
    {
      label: t("userPosts.inactive"),
      key: "inactive",
      children: postsDiv,
    },
  ];

  if (!isMyProfile) {
    return postsDiv;
  }

  return (
    <>
      {modal && <CreatePostModal userId={user.uuid} onClose={modalClose} afterCreate={loadPosts} />}
      <Button type="primary" onClick={modalOpen} className="create-post-button">
        {t("userProfile.createPostButtonText")}
      </Button>
      <Tabs items={tabs} onChange={onTabChange} style={{ width: "100%" }} />
    </>
  );
};

export default UserPosts;
