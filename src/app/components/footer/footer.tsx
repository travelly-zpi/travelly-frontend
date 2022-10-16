import { Layout } from "antd";
import logo from "../../assets/img/logo.png";
import * as React from "react";

import "./footer.scss";
import { useTranslation } from "react-i18next";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <AntFooter className="footer">
      <span>
        © {new Date().getFullYear()} Travelly. {t("footer.copyright")}
      </span>
      <img src={logo} alt="Travelly logo" style={{ height: "34px" }} />
    </AntFooter>
  );
};

export default Footer;
