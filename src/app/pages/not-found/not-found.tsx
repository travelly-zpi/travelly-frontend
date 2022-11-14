import "./not-found-page.scss";
import notFoundImage from "app/assets/img/notFoundPage.png";

import { Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { Title } = Typography;

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="not-found-page">
      <Title className="title">{t("notFoundPage.title")}</Title>
      <img src={notFoundImage} alt="Not found page" />
      <Button type="primary">
        <Link to="/">GO TO HOMEPAGE</Link>
      </Button>
    </section>
  );
};

export default NotFound;
