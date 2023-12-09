import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import InputGroup from "../components/InputGroup";
import PasswordField from "../components/PasswordField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../constants/Api";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  profile: "",
};

const Auth = () => {
  const [openReg, setOpenReg] = useState(false);
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);
    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "accredian_user");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Profile Picture Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setDetails({ ...details, profile: finalRes.url });
      } else {
        toast.error("Failed to upload image! Try again later!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }
  };

  const register = async () => {
    setLoading(true);
    if (details.password !== details.cpassword) {
      toast.error("Mismatch passwords", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${api}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Registered Successfully!!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpenReg(false);
        setDetails(initialState);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const login = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Loggedin Successfully!!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.setItem("accredian-user", JSON.stringify(data.user));
        window.location.reload();
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Box>
      <Typography
        textAlign="center"
        fontSize={32}
        fontWeight="bold"
        color="primary"
        mb={2}
      >
        {openReg ? "Register" : "Login"}
      </Typography>
      <Box>
        {openReg && (
          <InputGroup
            type="text"
            other="name"
            label="Name"
            value={details.name}
            onChange={handleChange}
          />
        )}
        <InputGroup
          type="email"
          other="email"
          label="Email"
          value={details.email}
          onChange={handleChange}
        />
        <PasswordField
          name="password"
          label="Password"
          value={details.password}
          onChange={handleChange}
        />
        {openReg && (
          <>
            <PasswordField
              name="cpassword"
              label="Retype Password"
              value={details.cpassword}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="file"
              name="profile"
              className="mb-4"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </>
        )}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Grid item md={6}>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              onClick={openReg ? register : login}
            >
              {openReg ? "Register" : "Login"}
            </Button>
          </Grid>
          <Grid item md={6}>
            <Typography
              color="GrayText"
              onClick={() => setOpenReg(!openReg)}
              sx={{ cursor: "pointer" }}
              fontSize={15}
              textAlign="end"
            >
              {openReg ? "Already registered?" : "Don't have an account?"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Auth;
