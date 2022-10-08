import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const NotFound = () => {
  return (
    <Box display="flex" flexDirection="column">
      <h1>Oops!</h1>
      <p>Sorry, this page doesn't exist</p>
      <Button href="/">Go Home</Button>
    </Box>
  );
};

export default NotFound;
