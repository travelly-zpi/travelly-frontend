import "./board-page.scss";

import { Input, Pagination, Tabs, Typography } from "antd";
import { PostPreviewInterface } from "../../interfaces/post-preview.interface";
import Post from "../../components/post/post";
import ClipartNoResults from "../../assets/img/clipart-no-results";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../../contexts/loading-context";
import axios from "axios";

const { Search } = Input;
const { Title } = Typography;

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPosts, setTotalPosts] = useState(1);
  const [postType] = useState("discover");
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/post`, {
        params: {
          active: true,
          page: page,
          size: pageSize,
        },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, postType]);

  const onTabChange = (key: string) => {
    console.log(key);
    setPage(1);
    setTotalPosts(1);
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const postsDiv =
    posts.length > 0 ? (
      <div className="board-posts">
        <div className="posts-block">
          {posts?.map((post: PostPreviewInterface) => (
            <Post post={post} key={post.uuid} isMyProfile={false}></Post>
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
      <div className="board-posts">
        <ClipartNoResults></ClipartNoResults>
        <Title level={3}>No posts found</Title>
      </div>
    );

  const tabs = [
    {
      label: "Discover",
      key: "discover",
      children: postsDiv,
    },
    {
      label: "Accommodation",
      key: "accommodation",
      children: postsDiv,
    },
    {
      label: "Carpooling",
      key: "carpooling",
      children: postsDiv,
    },
    {
      label: "Trip together",
      key: "trip",
      children: postsDiv,
    },
    {
      label: "Excursion",
      key: "excursion",
      children: postsDiv,
    },
    {
      label: "Other",
      key: "other",
      children: postsDiv,
    },
  ];

  const onSearch = () => {};

  return (
    <section className="board-page">
      <Search
        placeholder="Start your search"
        onSearch={onSearch}
        className="board-search"
        size="large"
      />
      <Tabs items={tabs} onChange={onTabChange} centered />
    </section>
  );
};

export default BoardPage;
