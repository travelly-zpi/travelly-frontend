import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import pages from "app/config/navbar-pages.json";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavbarPageInterface } from "app/interfaces/navbar-page.interface";

const NavBar = () => {
  const { i18n, t } = useTranslation();

  const onLangChange = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ModeOfTravelIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Travelly
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.unauthorized.map((page: NavbarPageInterface) => (
              <Button
                key={page.link}
                href={page.link}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t(page.translationKey)}
              </Button>
            ))}
          </Box>
          <FormControl variant="outlined" sx={{ minWidth: "120px", m: "1" }}>
            <Select
              id="language"
              value={i18n.language}
              onChange={onLangChange}
              displayEmpty
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"pl"}>Polski</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
