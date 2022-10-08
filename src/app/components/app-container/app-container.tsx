import NavBar from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const AppContainer = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default AppContainer;
