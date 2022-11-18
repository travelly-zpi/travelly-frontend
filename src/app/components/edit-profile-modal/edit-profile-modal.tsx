import "./edit-profile-modal.scss";

import Modal from "../modal/modal";

import { Tabs, Typography } from "antd";

import logo from "../../assets/img/logo.png";
import * as React from "react";
import { UserInterface } from "../../interfaces/user.interface";
import UserInfoForm from "./user-info-form/user-info-form";
import UserPasswordForm from "./user-password-form/user-password-form";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

interface EditProfileModalProps {
  onClose: Function;
  user: UserInterface;
}

const EditProfileModal = ({ onClose, user }: EditProfileModalProps) => {
  const { t } = useTranslation();

  const forms = [
    {
      label: t("editProfile.profileInfo"),
      key: "profile-info",
      children: <UserInfoForm user={user} onClose={onClose}></UserInfoForm>,
    },
    {
      label: t("editProfile.changePassword"),
      key: "change-password",
      children: (
        <UserPasswordForm user={user} onClose={onClose} data-testid="change-passsword-tab"></UserPasswordForm>
      ),
    },
  ];

  return (
    <Modal onClose={onClose}>
      <div className="edit-profile-container" data-testid="edit-profile-modal">
        <Title level={3}>{t("editProfile.editProfile")}</Title>
        <Tabs items={forms} />
        <img src={logo} alt="Travelly logo" className="logo" />
      </div>
    </Modal>
  );
};

export default EditProfileModal;
