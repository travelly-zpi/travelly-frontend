import "./user-profile-page.scss";
import testAvatarImage from "app/assets/img/testAvatar.jpeg";

import { Button, Space, Typography } from "antd";
import { Trans, useTranslation } from "react-i18next";

const { Text, Title } = Typography;

const UserProfilePage = () => {
  const { t } = useTranslation();

  return (
    <section className="user-profile-page">
      <div className="user-avatar">
        <img src={testAvatarImage} alt="avatar"/>
      </div>
      <div className="user-info">
        <Title className="title" level={4}>Vasia Batarejkin, 29 years</Title>
        <Text className="location">Wroclaw, Poland</Text>
        <Text className="languages">
          <Trans
            i18nKey="userProfilePage.languages"
            components={{ bold: <strong /> }}
          />
          Polish, English
        </Text>
        <Text className="about-me">
          <Trans
            i18nKey="userProfilePage.aboutMe"
            components={{ bold: <strong /> }}
          />
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
        </Text>
        <Button type="primary" href="#home-target">
            {t("homePage.first.buttonText")}
        </Button>
      </div>
    </section>
  ); 
};

export default UserProfilePage;