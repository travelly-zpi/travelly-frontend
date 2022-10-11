import "./home-page.scss";
import HomePageClipart from "app/assets/img/home-page-clipart";
import Accommodation from "app/assets/img/accommodation.jpeg";
import Carpooling from "app/assets/img/carpooling.jpeg";
import TravelBuddies from "app/assets/img/travelBuddies.jpeg";
import Tours from "app/assets/img/tours.jpeg";
import BringPeople from "app/assets/img/bringPeople.jpeg";

import { Button, Typography } from "antd";
import { Trans, useTranslation } from "react-i18next";
import HomeCard from "../../components/home-card/home-card";

const { Text, Title } = Typography;

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <section className="home-page">
      <div className="home-first">
        <div className="info-block">
          <Title>{t("homePage.first.title")}</Title>
          <Text>{t("homePage.first.subTitle")}</Text>
          <Button type="primary" href="#home-target">
            {t("homePage.first.buttonText")}
          </Button>
        </div>
        <HomePageClipart />
      </div>
      <div className="home-second" id="home-target">
        <Title level={2} className="title">
          <Trans
            i18nKey="homePage.second.title"
            components={{ bold: <strong /> }}
          />
        </Title>
        <div className="home-cards">
          <HomeCard
            imgSrc={Accommodation}
            title={t("homePage.second.accommodation")}
            subTitle={t("homePage.second.accommodationSubTitle")}
          />
          <HomeCard
            imgSrc={Carpooling}
            title={t("homePage.second.carpooling")}
            subTitle={t("homePage.second.carpoolingSubTitle")}
          />
          <HomeCard
            imgSrc={TravelBuddies}
            title={t("homePage.second.travelBuddies")}
            subTitle={t("homePage.second.travelBuddiesSubTitle")}
          />
          <HomeCard
            imgSrc={Tours}
            title={t("homePage.second.tours")}
            subTitle={t("homePage.second.toursSubTitle")}
          />
        </div>
      </div>
      <div className="home-third">
        <Title level={2} className="title">
          <Trans
            i18nKey="homePage.third.title"
            components={{ bold: <strong /> }}
          />
        </Title>
        <Text type="secondary" className="subTitle">
          {t("homePage.third.subTitle")}
        </Text>
        <div className="info-block">
          <div className="topics-block">
            <div className="number-box">01</div>
            <Text>{t("homePage.third.firstTitle")}</Text>
            <Text type="secondary">{t("homePage.third.firstSubTitle")}</Text>
            <div className="number-box">02</div>
            <Text>{t("homePage.third.secondTitle")}</Text>
            <Text type="secondary">{t("homePage.third.secondSubTitle")}</Text>
            <div className="number-box">03</div>
            <Text>{t("homePage.third.thirdTitle")}</Text>
            <Text type="secondary">{t("homePage.third.thirdSubTitle")}</Text>
          </div>
          <img src={BringPeople} alt="Bring people together iamge" />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
