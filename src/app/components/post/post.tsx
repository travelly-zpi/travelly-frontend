import "./post.scss";
import { Card, Tooltip } from "antd";
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
import { useTranslation } from "react-i18next";

interface PostProps {
  post: PostPreviewInterface;
  onDelete: Function;
  onChangeStatus: Function;
  isMyProfile: boolean;
}

const Post = ({ post, onDelete, onChangeStatus, isMyProfile }: PostProps) => {
  const { t } = useTranslation();
  const { loading } = useContext(LoadingContext);

  return (
    <Card
      className={"post" + (isMyProfile ? " post-user" : "")}
      cover={
        <img
          alt={post.title}
          src={post.mainImageUrl ? post.mainImageUrl : Other}
        />
      }
      title={post?.title}
      extra={<Link to={"/post/" + post.uuid}>{t("post.more")}</Link>}
      actions={
        isMyProfile
          ? [
              <Tooltip title={t("post.deletePost")}>
                <DeleteOutlined key="delete" onClick={() => onDelete()} />
              </Tooltip>,
              <Tooltip title={t("post.editPost")}>
                <EditOutlined key="edit" />
              </Tooltip>,
              <Tooltip title={t("post.changeStatus")}>
                <CloseCircleOutlined
                  key="deactivate"
                  onClick={() => onChangeStatus()}
                />
              </Tooltip>,
            ]
          : []
      }
      loading={loading}
    >
      <Meta description={post?.description} />
    </Card>
  );
};

export default Post;
