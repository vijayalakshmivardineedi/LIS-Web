import React, { useState, useEffect, useRef } from "react";
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
import ClockIcon from "@mui/icons-material/AccessTime";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImage from "../../../assets/Gif/Reset password.gif";
import { useDispatch, useSelector } from "react-redux";
import { setOtp, verifyOtp } from "../../../Redux/Slice/SuperAdmin/OtpSlice";

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

const OtpVerification = () => {
  const [countdown, setCountdown] = useState(180);
  const otp = useSelector((state) => state.otp.otp);
  // const email = useSelector((state) => state.otp.email);
  const status = useSelector((state) => state.otp.status);
  const error = useSelector((state) => state.otp.error);
  const { email } = useParams();
  const verified = useSelector((state) => state.otp.verified);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (verified) {
      navigate(`/ResetPasswordScreen/${email}`); // Replace with actual navigation
    }
  }, [verified, navigate]);

 const handleOtpChange = (e, index) => {
   const value = e.target.value;
   const newOtp = [...otp]; // Create a copy of the otp array

   if (value === "") {
     newOtp[index] = "";
     dispatch(setOtp(newOtp));
     if (index > 0) {
       inputRefs.current[index - 1].focus();
     }
   } else if (value.match(/^[0-9]$/)) {
     newOtp[index] = value;
     dispatch(setOtp(newOtp));
     if (index < 5) {
       inputRefs.current[index + 1].focus();
     }
   }
 };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleResendOTP = () => {
    setCountdown(180);
  };

  const handleContinue = () => {
    dispatch(verifyOtp({ email, otp: otp.join("") }));
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
                    <ClockIcon />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{ fontFamily: "Georgia, serif", fontWeight: "800" }}
                  >
                    Verification Code
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
                    Enter the OTP sent to your email
                  </Typography>
                  {status === "failed" && (
                    <Typography color="error" variant="body2">
                      {error}
                    </Typography>
                  )}
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      mb={4}
                      px={2}
                    >
                      {otp.map((digit, index) => (
                        <TextField
                          key={index}
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          inputProps={{
                            maxLength: 1,
                            style: { textAlign: "center" },
                          }}
                          inputRef={(el) => (inputRefs.current[index] = el)}
                          sx={{
                            width: 40, // Adjusted width
                            height: 40, // Adjusted height
                            margin: 1, // Added margin for spacing
                          }}
                        />
                      ))}
                    </Box>
                   
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleContinue}
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontFamily: "Georgia, serif",
                        fontWeight: "800",
                      }}
                      disabled={status === "loading"}
                    >
                      Continue
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
                  <img
                    src={backgroundImage}
                    alt="Background"
                  
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </ThemeProvider>
  );
};

export default OtpVerification;
