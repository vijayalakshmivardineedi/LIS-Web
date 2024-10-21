import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import backgroundImage from "../../../assets/Gif/Reset password.gif";
import { resetPassword, resetState } from "../../../Redux/Slice/SuperAdmin/passwordResetSlice";

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

const PasswordReset = () => {
  const { email } = useParams(); // Retrieve email from URL parameters
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.passwordReset
  );

  useEffect(() => {
    if (success) {
      navigate("/");
      dispatch(resetState());
    }
  }, [success, navigate, dispatch]);

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    dispatch(resetPassword({ email, newPassword }));
  };

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
                    Reset Password
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
                    Enter your new password and confirm it.
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={handleResetPassword}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="new-password"
                      label="New Password"
                      name="new-password"
                      type="password"
                      autoComplete="new-password"
                      autoFocus
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      sx={{
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "500",
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="confirm-password"
                      label="Confirm Password"
                      name="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={!!passwordError}
                      helperText={passwordError}
                      sx={{
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "500",
                      }}
                    />
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
                      disabled={loading}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
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

export default PasswordReset;
