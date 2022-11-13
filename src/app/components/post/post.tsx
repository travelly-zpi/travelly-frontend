import "./post.scss";
import { Card, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useContext } from "react";
import LoadingContext from "../../contexts/loading-context";
import { Link } from "react-router-dom";
import { PostPreviewInterface } from "../../interfaces/post-preview.interface";
import { useTranslation } from "react-i18next";
import { defaultImageName } from "../../utils/post-utils";

interface PostProps {
  post: PostPreviewInterface;
  onDelete: Function;
  onChangeStatus: Function;
  isMyProfile: boolean;
  active: boolean;
}

const Post = ({
  post,
  onDelete,
  onChangeStatus,
  isMyProfile,
  active,
}: PostProps) => {
  const { t } = useTranslation();
  const { loading } = useContext(LoadingContext);

  const statusIcon = active ? (
    <Tooltip title={t("post.deactivate")}>
      <CloseCircleOutlined key="deactivate" onClick={() => onChangeStatus()} />
    </Tooltip>
  ) : (
    <Tooltip title={t("post.activate")}>
      <CheckCircleOutlined key="activate" onClick={() => onChangeStatus()} />
    </Tooltip>
  );

  return (
    <Card
      className={"post" + (isMyProfile ? " post-user" : "")}
      cover={
        <img
          alt={post.title}
          src={post.mainImage ? post.mainImage : defaultImageName(post)}
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
              statusIcon,
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
