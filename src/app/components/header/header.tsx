import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button, Dropdown, Layout, Menu, Tooltip, Typography } from "antd";

import logo from "app/assets/img/logo.png";

import "./header.scss";
import { GlobalOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import RegisterModal from "../register-modal/register-modal";
import LoginModal from "../login-modal/login-modal";
import UserContext from "../../contexts/user-context";

const { Header: AntHeader } = Layout;
const { Text, Link } = Typography;

const Header = () => {
  const { i18n, t } = useTranslation();
  const [modal, setModal] = useState<null | "register" | "login">(null);
  const [lang, setLang] = useState<string>(
    localStorage.getItem("lang") || "en"
  );
  const { user, onLogout } = useContext(UserContext);

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }, [lang, i18n]);

  const languageMenu = (
    <Menu
      onClick={({ key }) => setLang(key)}
      items={[
        {
          key: "en",
          label: <Text strong={lang === "en"}>English</Text>,
        },
        {
          key: "pl",
          label: <Text strong={lang === "pl"}>Polski</Text>,
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

        {user ? (
          <div className="button-group">
            <Button onClick={onLogout}>Logout</Button>

            <Dropdown overlay={languageMenu} placement="bottomRight">
              <Tooltip title={t("")}>
                <Button icon={<GlobalOutlined />}></Button>
              </Tooltip>
            </Dropdown>
          </div>
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
