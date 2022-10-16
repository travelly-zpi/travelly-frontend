import "./not-found-page.scss";
import notFoundImage from "app/assets/img/notFoundPage.png";

import { Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="not-found-page">
      <Title className="title">{t("not-found-page.title")}</Title>
      <img src={notFoundImage} alt="Not found page" />
    </section>
  ); 
};

export default NotFound;
