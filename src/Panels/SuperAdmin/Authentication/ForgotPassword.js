// src/components/EmailVerification.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../../../assets/Images/SuperAdmin/Email campaign.gif";
import { sendVerificationEmail, clearErrors } from "../../../Redux/Slice/SuperAdmin/emailVerificationSlice";

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

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector(
    (state) => state.emailVerification
  );

  // Clear errors on mount
  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // Handle navigation and error setting
  useEffect(() => {
    if (message) {
      navigate(`/OtpVerification/${email}`);
    }
  }, [message, navigate, email]);

  useEffect(() => {
    if (error) {
      setEmailError(error.message || "An error occurred");
    } else {
      setEmailError(""); // Clear the error if there is no error
    }
  }, [error]);

  const handleVerification = () => {
    if (!email) {
      setEmailError("Email address is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid.");
    } else {
      setEmailError("");
      dispatch(sendVerificationEmail(email));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ minHeight: "100vh", p: 0 }}>
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
                    padding: 2,
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
                    Email Verification
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
                    }}
                  >
                    Enter your email address
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 1 }}>
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
                      error={!!emailError}
                      helperText={emailError}
                      sx={{
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "500",
                      }}
                    />
                    {emailError && (
                      <Typography color="error" sx={{ mt: 2 }}>
                        {emailError}
                      </Typography>
                    )}
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontFamily: "Georgia, serif",
                        fontWeight: "800",
                      }}
                      onClick={handleVerification}
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Verify Email"}
                    </Button>
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
                    overflow: "hidden",
                  }}
                >
                  <img src={backgroundImage} alt="Background" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default EmailVerification;
