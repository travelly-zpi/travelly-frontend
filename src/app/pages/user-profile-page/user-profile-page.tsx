import "./user-profile-page.scss";
import { Avatar, Button, Image, message, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../contexts/user-context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserInterface } from "app/interfaces/user.interface";
import EditProfileModal from "../../components/edit-profile-modal/edit-profile-modal";
import LoadingContext from "../../contexts/loading-context";
import moment from "moment";
import { HomeFilled, UserOutlined } from "@ant-design/icons";
import UserPosts from "../../components/user-posts/user-posts";
import { decodeUser } from "../../utils/user-utils";

const { Text, Title } = Typography;
const { CheckableTag } = Tag;

const UserProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    user: loggedInUser,
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
  }, [id]);

  useEffect(() => {
    if (
      !warningShown &&
      isMyProfile &&
      user &&
      (!user?.languages.length || !user?.localisation || !user?.dateOfBirth)
    ) {
      message.warn(t("userProfile.fillProfile"));
      setModal("edit-profile");
      setWarningShown(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMyProfile, user]);

  if (!user) {
    return null;
  }

  return (
    <>
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
            <Image
              className="user-avatar"
              src={process.env.REACT_APP_AZURE_CONTAINER_URL + user.imageUrl}
            ></Image>
          ) : (
            <Avatar size={150} icon={<UserOutlined></UserOutlined>}></Avatar>
          )}

          <div className="user-info">
            <div>
              <Title
                className="title"
                data-testid="user-title"
                level={2}
                style={{ display: "inline" }}
              >
                {user.firstName} {user.lastName}
              </Title>
              <Text
                type="secondary"
                style={{ display: "inline", fontSize: "18px" }}
              >
                {" "}
                {moment().diff(user.dateOfBirth, "years")}{" "}
                {t("userProfile.years")}
              </Text>
            </div>

            <Text className="location">
              <HomeFilled style={{ marginRight: "10px" }} />
              {user.localisation?.toUpperCase()}
            </Text>
            <Text type="secondary">{t("userProfile.languages")}</Text>
            <Text className="languages">
              {user.languages?.map((lang: string) => (
                <CheckableTag key={lang} checked={true}>
                  {lang}
                </CheckableTag>
              ))}
            </Text>

            {user.description && (
              <>
                <Text type="secondary">{t("userProfile.aboutMe")}</Text>
                <Text className="about-me">{user.description}</Text>
              </>
            )}

            {isMyProfile ? (
              <Button
                className="button"
                onClick={() => setModal("edit-profile")}
              >
                {t("userProfile.editPostButtonText")}
              </Button>
            ) : (
              <Button className="button" type="primary" onClick={() => {}}>
                {t("userProfile.contactButtonText")}
              </Button>
            )}
          </div>
        </div>
        <div className="posts-section">
          <UserPosts
            user={user}
            isMyProfile={isMyProfile}
            openModal={() => setModal("create-post")}
            closeModal={() => setModal(null)}
          ></UserPosts>
        </div>
      </section>
    </>
  );
};

export default UserProfilePage;
