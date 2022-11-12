import "./post.scss";
import { Card } from "antd";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useContext } from "react";
import LoadingContext from "../../contexts/loading-context";
import { Link } from "react-router-dom";
import { PostPreviewInterface } from "../../interfaces/post-preview.interface";
import Other from "../../assets/img/post/other.png";

interface PostProps {
  post: PostPreviewInterface;
  onDelete: Function;
  onChangeStatus: Function;
}

const Post = ({ post, onDelete, onChangeStatus }: PostProps) => {
  const { loading } = useContext(LoadingContext);

  return (
    <Card
      className="post"
      cover={
        <img
          alt={post.title}
          src={post.mainImageUrl ? post.mainImageUrl : Other}
        />
      }
      title={post?.title}
      extra={<Link to={"/post/" + post.uuid}>More</Link>}
      actions={[
        <DeleteOutlined key="delete" onClick={() => onDelete()} />,
        <EditOutlined key="edit" />,
        <CloseCircleOutlined
          key="deactivate"
          onClick={() => onChangeStatus()}
        />,
      ]}
      loading={loading}
    >
      <Meta description={post?.description} />
    </Card>
  );
};

export default Post;
