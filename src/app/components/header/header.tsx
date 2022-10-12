import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Tooltip,
  Typography,
} from "antd";

import logo from "app/assets/img/logo.png";

import "./header.scss";
import { GlobalOutlined } from "@ant-design/icons";
import { useState } from "react";
import RegisterModal from "../register-modal/register-modal";
import LoginModal from "../login-modal/login-modal";

const { Header: AntHeader } = Layout;
const { Text, Link } = Typography;

const Header = () => {
  const { i18n, t } = useTranslation();
  const [modal, setModal] = useState<null | "register" | "login">(null);
  const isAuthorized = false;

  const onLanguageChange: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(key);
  };

  const languageMenu = (
    <Menu
      onClick={onLanguageChange}
      items={[
        {
          key: "en",
          label: <Text strong={i18n.language === "en"}>English</Text>,
        },
        {
          key: "pl",
          label: <Text strong={i18n.language === "pl"}>Polski</Text>,
        },
      ]}
    />
  );

  return (
    <>
      {modal === "register" && (
        <RegisterModal
          onClose={() => setModal(null)}
          onModalSwitch={() => setModal("login")}
        />
      )}
      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onModalSwitch={() => setModal("register")}
        />
      )}
      <AntHeader className="header">
        <Link href="/">
          <img src={logo} alt="Travelly logo" className="logo" />
        </Link>

        {isAuthorized ? (
          <></>
        ) : (
          <div className="button-group">
            <Button onClick={() => setModal("login")}>
              {t("navbar.login")}
            </Button>
            <Button type="primary" onClick={() => setModal("register")}>
              {t("navbar.register")}
            </Button>

            <Dropdown overlay={languageMenu} placement="bottomRight">
              <Tooltip title={t("")}>
                <Button icon={<GlobalOutlined />}></Button>
              </Tooltip>
            </Dropdown>
          </div>
        )}

        {/*<Menu*/}
        {/*  theme="light"*/}
        {/*  mode="horizontal"*/}
        {/*  items={pages.unauthorized.map((page: NavbarPageInterface) => {*/}
        {/*    return {*/}
        {/*      key: page.link,*/}
        {/*      label: t(page.translationKey),*/}
        {/*    };*/}
        {/*  })}*/}
        {/*  style={{*/}
        {/*    flex: "1",*/}
        {/*    display: "flex",*/}
        {/*    justifyContent: "flex-end",*/}
        {/*    borderBottom: "none",*/}
        {/*  }}*/}
        {/*/>*/}
      </AntHeader>
    </>
  );
};

export default Header;
