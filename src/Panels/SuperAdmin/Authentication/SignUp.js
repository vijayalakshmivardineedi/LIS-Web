import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Avatar,
  FormControl,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../../../assets/Gif/Mobile login.gif";
import { signupSuperAdmin } from "../../../Redux/Slice/SuperAdmin/SignUpSlice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#630000",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    success,
    error: signupError,
  } = useSelector((state) => state.superAdmin);

  const handleSignup = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    dispatch(signupSuperAdmin({ firstName, secondName, email, password }));
  };

  const handleLogin = () => {
    navigate("/");
  };

  if (success) {
    navigate("/");
  }

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
            background: "linear-gradient(135deg, #630000 0%, #ffc7d4 100%)",
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
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontWeight: "800",
                    }}
                  >
                    Sign Up
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    sx={{ paddingLeft: 5, paddingRight: 5 }}
                    onSubmit={handleSignup}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                          <TextField
                            required
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="given-name"
                            autoFocus
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            InputLabelProps={{
                              style: {
                                width: "auto",
                                maxWidth: "150px",
                                fontFamily: "Arial, sans-serif",
                                fontWeight: "500",
                              },
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                          <TextField
                            required
                            id="secondName"
                            label="Second Name"
                            name="secondName"
                            autoComplete="family-name"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                            InputLabelProps={{
                              style: {
                                width: "auto",
                                maxWidth: "150px",
                                fontFamily: "Arial, sans-serif",
                                fontWeight: "500",
                              },
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{
                          style: {
                            width: "auto",
                            maxWidth: "150px",
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "500",
                          },
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{
                          style: {
                            width: "auto",
                            maxWidth: "150px",
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "500",
                          },
                        }}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        required
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!error}
                        helperText={error}
                        InputLabelProps={{
                          style: {
                            width: "auto",
                            maxWidth: "150px",
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "500",
                          },
                        }}
                      />
                    </FormControl>
                    {signupError && (
                      <Typography color="error" variant="body2">
                        {signupError.message}
                      </Typography>
                    )}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 1,
                        mb: 1,
                        fontFamily: "Georgia, serif",
                        fontWeight: "800",
                      }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Sign Up"}
                    </Button>

                    <Grid container>
                      <Grid item>
                        <Link
                          href="#"
                          variant="body2"
                          onClick={handleLogin}
                          sx={{
                            cursor: "pointer",
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "500",
                          }}
                        >
                          {"Already have an account? Log in"}
                        </Link>
                      </Grid>
                    </Grid>
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

export default Signup;
