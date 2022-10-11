import { Layout } from "antd";
import logo from "../../assets/img/logo.jpeg";
import * as React from "react";

import "./footer.scss";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <span>© {new Date().getFullYear()} Travelly. All rights reserved.</span>
      <img src={logo} alt="Travelly logo" style={{ height: "34px" }} />
    </AntFooter>
  );
};

export default Footer;
