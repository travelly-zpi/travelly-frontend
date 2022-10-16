import "./user-profile-page.scss";
import testAvatarImage from "app/assets/img/testAvatar.jpeg";

import { Button, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import UserContext from "../../contexts/user-context";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserInterface } from "app/interfaces/user.interface";

const { Text, Title } = Typography;

const UserProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserContext);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>(null);

  const isMyProfile = loggedInUser?.uuid === id;

  useEffect(() => {
    // TODO: uncomment when `GET /users/:id` will be ready to use and remove the mock
    // axios.get(`/users/${id}`)
    axios.get('/userMock.json', { baseURL: '/' })
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        navigate('/not-found-page');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!loggedInUser) {
    return <Navigate to="/" />;
  }

  if (!user || isLoading) {
    return <p>'Loading ...'</p>;
  }

  return (
    <section className="user-profile-page">
      <div className="user-info-section ">
        <div className="user-avatar">
          <img src={testAvatarImage} alt="avatar"/>
        </div>
        <div className="user-info">
          {/* TODO: display age, using date from BE */}
          <Title className="title" level={4}>{user.firstName} {user.lastName}, 29 years</Title>
          <Text className="location">{user.localisation.city}, {user.localisation.country}</Text>
          <Text className="languages">
            <Trans
              i18nKey="userProfilePage.languages"
              components={{ bold: <strong /> }}
            />
            {(user.languages).join(', ')}
          </Text>
          <Text className="about-me">
            <Trans
              i18nKey="userProfilePage.aboutMe"
              components={{ bold: <strong /> }}
            />
            {user.description}
          </Text>
          {isMyProfile && (
            <Button className="edit-button">
              {t("userProfilePage.editPostButtonText")}
            </Button>
          )}
        </div>
      </div>
      <div className="posts-section">
        {isMyProfile && (
            <Button type="primary" className="create-post-button">
              {t("userProfilePage.createPostButtonText")}
            </Button>
        )}
      </div>
    </section>
  ); 
};

export default UserProfilePage;
