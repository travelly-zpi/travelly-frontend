import { Box, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { RegisterUserModel } from "app/models/register-user.model";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(new RegisterUserModel());

  const onClick = () => {
    setLoading(!loading);
    console.log(model);
    setTimeout(() => setLoading(false), 5000);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newModel = {
      ...model,
      [event.currentTarget.id]: event.currentTarget.value,
    };
    console.log(newModel);
    setModel(newModel);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="10px"
    >
      <Typography variant="h3">{t("registration.title")}</Typography>
      <TextField
        id="name"
        label={t("registration.name")}
        type="text"
        value={model.name}
        onChange={onChange}
      />
      <TextField
        id="surname"
        label={t("registration.surname")}
        type="text"
        value={model.surname}
        onChange={onChange}
      />
      <TextField
        id="email"
        label={t("registration.email")}
        type="text"
        value={model.email}
        onChange={onChange}
      />
      <TextField
        id="password"
        label={t("registration.password")}
        type="password"
        value={model.password}
        onChange={onChange}
      />
      <TextField
        id="passwordConfirm"
        label={t("registration.passwordConfirm")}
        type="password"
        helperText={t("registration.passwordConfirmHint")}
        value={model.passwordConfirm}
        onChange={onChange}
      />
      <LoadingButton variant="contained" onClick={onClick} loading={loading}>
        Register
      </LoadingButton>
    </Box>
  );
};

export default Registration;
