import "./user-verification-page.scss";
import complitedImg from "app/assets/img/verification-complited.png";
import { Button, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import VerificationModal from "app/components/verification-modal/verification-modal";

const { Title, Text } = Typography;

const VerificationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");
  const [status, setStatus] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`user/register/verify?token=${token}`)
      .then((res) => {
        setStatus("OK");
        console.log(res.data.statusCode);
      })
      .catch((err) => {
        setStatus(err.response.data);
      });
  }, []);

  if (status === "") return <section></section>;

  return (
    <>
      <VerificationModal open={modal} onClose={() => setModal(false)} />
      <section className="verification-page">
        <div className="info">
          {status === "OK" ? (
            <>
              <Title className="title">
                {t("verificationPage.successTitle")}
              </Title>
              <Text className="subTitle">
                {t("verificationPage.successSubTitle")}
              </Text>
              <img src={complitedImg} alt="Not found page" />
            </>
          ) : status === "EXPIRED_TOKEN" ? (
            <>
              <Title className="title">
                {t("verificationPage.expiredTitle")}
              </Title>
              <Text className="subTitle">
                {t("verificationPage.expiredSubTitle")}
              </Text>
              <Button type="primary" onClick={() => setModal(true)}>
                {t("verificationPage.resend")}
              </Button>
            </>
          ) : (
            <>
              <Title className="title">Oops!</Title>
              <Text className="subTitle">
                {t("verificationPage.invalidText")}
              </Text>
            </>
          )}
        </div>
        {status !== "EXPIRED_TOKEN" && (
          <div className="home-btn">
            <Button
              className="home-btn"
              type="primary"
              onClick={() => navigate("/")}
            >
              {t("verificationPage.btn")}
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default VerificationPage;
