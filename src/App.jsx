import { ThemeProvider, createTheme } from "@mui/material";
import { indigo, teal } from "@mui/material/colors";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: indigo,
    },

    typography: {
      fontFamily: "Noto Serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <ToastContainer transition={Zoom} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
