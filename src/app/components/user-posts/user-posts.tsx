import "./user-posts.scss";
import { Pagination, Tabs, Typography } from "antd";
import * as React from "react";
import Post from "../post/post";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../../contexts/loading-context";
import axios from "axios";
import { UserInterface } from "../../interfaces/user.interface";
import ClipartNoResults from "../../assets/img/clipart-no-results";
import { PostPreviewInterface } from "../../interfaces/post-preview.interface";

const { Title } = Typography;

interface UserPostsProps {
  user: UserInterface;
}

const UserPosts = ({ user }: UserPostsProps) => {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPosts, setTotalPosts] = useState(1);
  const { setLoading } = useContext(LoadingContext);

  const loadPosts = () => {
    setLoading(true);
    axios
      .get(`/post`, {
        params: {
          author: user.uuid,
          active: active,
          page: page,
          size: pageSize,
        },
      })
      .then((res) => {
        const data = res.data;
        setPosts(data.posts);
        setTotalPosts(data.count);
        console.log(data);
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
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

  const postDelete = (post: PostPreviewInterface) => {
    axios
      .delete(`/post/${post.uuid}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        loadPosts();
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      });
  };

  const postChangeStatus = (post: PostPreviewInterface) => {
    axios
      .put(`/post/${post.uuid}/status?status=${!active}`)
      .then((res) => {
        console.log(res);
        loadPosts();
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      });
  };

  const postsDiv = (
    <div className="user-posts">
      <div className="posts-block">
        {posts?.map((post: PostPreviewInterface) => (
          <Post
            post={post}
            key={post.uuid}
            onDelete={() => postDelete(post)}
            onChangeStatus={() => postChangeStatus(post)}
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
  );

  const tabs = [
    {
      label: "Active",
      key: "active",
      children: postsDiv,
    },
    {
      label: "Inactive",
      key: "inactive",
      children: postsDiv,
    },
  ];

  if (!posts.length) {
    return (
      <div className="user-posts">
        <ClipartNoResults></ClipartNoResults>
        <Title level={3}>You don't have any posts yet, create one!</Title>
      </div>
    );
  }

  return <Tabs items={tabs} onChange={onTabChange} style={{ width: "100%" }} />;
};

export default UserPosts;
