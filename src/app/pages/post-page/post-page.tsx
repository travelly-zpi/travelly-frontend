import "./post-page.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "../../contexts/loading-context";
import axios from "axios";
import { Button, Switch, Typography } from "antd";

import { decodePost } from "../../utils/post-utils";
import { PostInterface } from "../../interfaces/post.interface";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostInterface>();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/post/${id}`)
      .then((res) => {
        const data = res.data;
        setPost(decodePost(data));
        console.log(decodePost(data));
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      })
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  const changeStatus = (checked: boolean) => {
    axios
      .put(`/post/${post?.uuid}/status`, { status: checked })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        const msg = err.response?.data?.message;
        console.error(msg);
      });
  };

  if (!post) {
    return null;
  }

  return (
    <div className="post-page">
      <div className="post-header">
        <div className="post-title">
          <Title level={2}>{post.title}</Title>
          <div className="switch">
            <Text>Post is active</Text>
            <Switch checked={post.active} onChange={changeStatus} />
          </div>
        </div>

        <img
          alt={post.title}
          src={
            post.mainImageUrl
              ? post.mainImageUrl
              : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          }
        />
        <div className="post-buttons">
          <Button style={{ marginRight: "30px" }}>Edit</Button>
          <Button type="primary">Delete</Button>
        </div>
      </div>
      <div className="post-info">
        <div className="post-info-block">
          <EnvironmentOutlined></EnvironmentOutlined>
          <div className="post-info-text">
            <Text>Location</Text>
            <Text type="secondary">
              {post.startPoint + (post.endPoint ? " - " + post.endPoint : "")}
            </Text>
          </div>
        </div>
        <div className="post-info-block">
          <CalendarOutlined></CalendarOutlined>
          <div className="post-info-text">
            <Text>Date</Text>
            <Text type="secondary">
              {post.activeFrom.format("MMM d, yyyy") +
                " - " +
                post.activeTo.format("MMM d, yyyy")}
            </Text>
          </div>
        </div>
        <div className="post-info-block">
          <UserOutlined></UserOutlined>
          <div className="post-info-text">
            <Text>People</Text>
            <Text type="secondary">{post.participants}</Text>
          </div>
        </div>
      </div>
      <div className="post-description">
        <Title level={3}>Description</Title>
        <Text>{post.description}</Text>
      </div>
    </div>
  );
};

export default PostPage;
