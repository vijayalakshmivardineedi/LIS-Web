import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Redux/Slice/SuperAdmin/LoginSlice";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../../../assets/Gif/Sign in.gif";

const theme = createTheme({
  palette: {
    primary: {
      main: "#630000", // Button color
    },
    secondary: {
      main: "#FFFFFF", // Icon background color
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleForgotPassword = () => {
    navigate("/ForgotPassword");
  };

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/superadmin/dashboard"); // Navigate to the dashboard on successful login
    }
  }, [status, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          p: 0,
        }}
      >
        <Container
          component="main"
          maxWidth="100%"
          sx={{
            height: "100vh",
            display: "flex",
            background: "linear-gradient(135deg, #630000 0%, #ffc7d4 100%)", // Gradient color
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: "90%",
              width: "100%",
              marginTop: 5,
              backgroundColor: "white",
              boxShadow: 3,
              borderRadius: 3,
              p: 0,
              overflow: "hidden",
            }}
          >
            <Grid container sx={{ height: "100%" }}>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    backgroundColor: "#fef2f4",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ fontFamily: "Georgia, serif", fontWeight: "800" }}
                  >
                    Welcome Back!
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{
                      mt: 2,
                      mb: 2,
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "500",
                    }} // Added margin for spacing
                  >
                    Please log in to access the system.
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "500",
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "500",
                      }}
                    />
                    <Grid container>
                      <Grid item xs>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={handleForgotPassword}
                          sx={{
                            cursor: "pointer",
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "500",
                          }}
                        >
                          Forgot password?
                        </Link>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontFamily: "Georgia, serif",
                        fontWeight: "800",
                      }}
                      disabled={status === "loading"}
                    >
                      Login
                    </Button>
                    {error && (
                      <Typography color="error" variant="body2" align="center">
                        {error}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "0 12px 12px 0",
                  }}
                >
                  <img src={backgroundImage} alt="" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
