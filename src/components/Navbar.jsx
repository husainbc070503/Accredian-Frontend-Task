import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "../assets/img.jpeg";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ width: "200px" }}>
            <img src={Image} alt="image" width="100%" />
          </Box>
          <Typography sx={{ flex: 1 }} textAlign="end" ml={3} fontSize={32} fontWeight="bold">
            Accredian Assignment
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
