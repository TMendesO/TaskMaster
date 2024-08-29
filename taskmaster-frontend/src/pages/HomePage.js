import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Welcome
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ marginRight: 2 }}
          >
            Login
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
