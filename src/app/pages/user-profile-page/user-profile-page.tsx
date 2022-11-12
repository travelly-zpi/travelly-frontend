import "./user-profile-page.scss";
import { Avatar, Button, message, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../contexts/user-context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserInterface } from "app/interfaces/user.interface";
import EditProfileModal from "../../components/edit-profile-modal/edit-profile-modal";
import CreatePostModal from "../../components/new-post-modal/new-post-modal";
import LoadingContext from "../../contexts/loading-context";
import moment from "moment";
import { HomeFilled, UserOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const UserProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    user: loggedInUser,
    decodeUser,
    warningShown,
    setWarningShown,
  } = useContext(UserContext);
  const { id } = useParams();
  const { setLoading } = useContext(LoadingContext);

  const [user, setUser] = useState<UserInterface | null>(null);
  const [modal, setModal] = useState<null | "edit-profile" | "create-post">(
    null
  );

  const isMyProfile = loggedInUser?.uuid === id;

  const loadUser = () => {
    setLoading(true);
    axios
      .get(`/user/${id}`)
      .then(({ data }) => {
        setUser(decodeUser(data));
      })
      .catch(() => {
        navigate("/not-found-page");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !warningShown &&
      isMyProfile &&
      user &&
      (!user?.languages.length || !user?.localisation || !user?.dateOfBirth)
    ) {
      message.warn("Please fill your profile!");
      setModal("edit-profile");
      setWarningShown(true);
    }
  }, [isMyProfile, user, warningShown, setWarningShown]);

  if (!user) {
    return null;
  }

  return (
    <>
      {modal === "create-post" && (
        <CreatePostModal onClose={() => setModal(null)} />
      )}
      {modal === "edit-profile" && (
        <EditProfileModal
          user={user}
          onClose={() => {
            setModal(null);
            loadUser();
          }}
        />
      )}
      <section className="user-profile-page">
        <div className="user-info-section">
          {user.imageUrl ? (
            <Avatar
              size={150}
              src={process.env.REACT_APP_AZURE_CONTAINER_URL + user.imageUrl}
            ></Avatar>
          ) : (
            <Avatar size={150} icon={<UserOutlined></UserOutlined>}></Avatar>
          )}

          <div className="user-info">
            <div>
              <Title className="title" level={2} style={{ display: "inline" }}>
                {user.firstName} {user.lastName}
              </Title>
              <Text
                type="secondary"
                style={{ display: "inline", fontSize: "18px" }}
              >
                {" "}
                {moment().diff(user.dateOfBirth, "years")} years
              </Text>
            </div>

            <Text className="location">
              <HomeFilled style={{ marginRight: "10px" }} />
              {user.localisation?.toUpperCase()}
            </Text>
            <Text type="secondary">{t("userProfile.languages")}</Text>
            <Text className="languages">
              {user.languages?.map((lang: string) => (
                <Tag key={lang}>{lang}</Tag>
              ))}
            </Text>

            <Text type="secondary">{t("userProfile.aboutMe")}</Text>
            <Text className="about-me">{user.description}</Text>
            {isMyProfile && (
              <Button
                className="edit-button"
                onClick={() => setModal("edit-profile")}
              >
                {t("userProfile.editPostButtonText")}
              </Button>
            )}
          </div>
        </div>
        <div className="posts-section">
          {isMyProfile && (
            <Button
              type="primary"
              onClick={() => setModal("create-post")}
              className="create-post-button"
            >
              {t("userProfile.createPostButtonText")}
            </Button>
          )}
        </div>
      </section>
    </>
  );
};

export default UserProfilePage;
