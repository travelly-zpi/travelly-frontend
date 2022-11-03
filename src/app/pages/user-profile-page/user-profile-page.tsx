import "./user-profile-page.scss";
import testAvatarImage from "app/assets/img/testAvatar.jpeg";

import { Button, message, Tag, Typography } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserContext from "../../contexts/user-context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserInterface } from "app/interfaces/user.interface";
import EditProfileModal from "../../components/edit-profile-modal/edit-profile-modal";
import LoadingContext from "../../contexts/loading-context";
import moment from "moment";
import { HomeFilled } from "@ant-design/icons";

const { Text, Title } = Typography;

const UserProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user: loggedInUser, decodeUser } = useContext(UserContext);
  const { id } = useParams();
  const { setLoading } = useContext(LoadingContext);

  const [user, setUser] = useState<UserInterface | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const isMyProfile = loggedInUser?.uuid === id;

  const loadUser = useCallback(() => {
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
  }, [id, decodeUser, navigate, setLoading]);

  useEffect(() => loadUser(), [navigate, loadUser]);
  useEffect(() => {
    if (
      isMyProfile &&
      user &&
      (!user?.languages || !user?.localisation || !user?.description)
    ) {
      message.warn("Please fill your profile!");
      setShowEditModal(true);
    }
  }, [isMyProfile, user]);

  if (!user) {
    return null;
  }

  return (
    <>
      {showEditModal ? (
        <EditProfileModal
          user={user}
          onClose={() => {
            setShowEditModal(false);
            loadUser();
          }}
        />
      ) : null}
      <section className="user-profile-page">
        <div className="user-info-section ">
          <div className="user-avatar">
            <img src={testAvatarImage} alt="avatar" />
          </div>
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
              {user.localisation.toUpperCase()}
            </Text>
            <Text type="secondary">{t("userProfile.languages")}</Text>
            <Text className="languages">
              {user.languages.map((lang: string) => (
                <Tag key={lang}>{lang}</Tag>
              ))}
            </Text>

            <Text type="secondary">{t("userProfile.aboutMe")}</Text>
            <Text className="about-me">{user.description}</Text>
            {isMyProfile && (
              <Button
                className="edit-button"
                onClick={() => setShowEditModal(true)}
              >
                {t("userProfile.editPostButtonText")}
              </Button>
            )}
          </div>
        </div>
        <div className="posts-section">
          {isMyProfile && (
            <Button type="primary">
              {t("userProfile.createPostButtonText")}
            </Button>
          )}
        </div>
      </section>
    </>
  );
};

export default UserProfilePage;
