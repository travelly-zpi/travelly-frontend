import NavBar from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const AppContainer = () => {
  return (
    <Container maxWidth="lg">
      <NavBar />
      <Outlet />
    </Container>
  );
};

export default AppContainer;
