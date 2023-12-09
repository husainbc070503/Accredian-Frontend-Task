import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import Profile from "../components/Profile";

const Home = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("accredian-user"));
    if (storedUser) setUser(storedUser);
  });

  return (
    <Container maxWidth="lg">
      <Box className="w-50 mx-auto">
        <Typography
          mt={4}
          fontSize={35}
          fontWeight="bold"
          color="secondary"
          textAlign="center"
        >
          Welcome to Accredian
        </Typography>
        {Object.keys(user).length > 0 ? <Profile user={user} /> : <Auth />}
      </Box>
    </Container>
  );
};

export default Home;
