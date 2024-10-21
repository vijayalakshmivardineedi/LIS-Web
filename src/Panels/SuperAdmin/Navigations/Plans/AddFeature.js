import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createFeature,
  fetchFeatures,
} from "../../../../Redux/Slice/SuperAdmin/FeaturesSlice";
import { useNavigate } from "react-router-dom";
import Dialog from "../../../../Dailogebox/DialogBox";
import { IoArrowBackSharp } from "react-icons/io5";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#630000",
    },
  },
});
const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: "#630000",
  color: "#fff",
  border: "1px solid #fff",
  marginLeft: "10px",
  marginRight: "10px",
  "&:hover": {
    background: "#FFF",
    border: "1px solid #630000",
    "& svg": {
      color: "#630000",
    },
  },
  "& svg": {
    fontSize: "20px",
  },
}));

const AddFeature = () => {
  const [featureName, setFeatureName] = useState("");
  const [featureNameError, setFeatureNameError] = useState(false);
  const [featurePrice, setFeaturePrice] = useState("");
  const [featurePriceError, setFeaturePriceError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const featureStatus = useSelector((state) => state.features.status);
  const successMessage = useSelector((state) => state.features.successMessage);
  const error = useSelector((state) => state.features.error);
  const [showDialog, setShowDialog] = useState(false);

  const handleFeatureNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setFeatureName(value);
      setFeatureNameError(false);
    } else {
      setFeatureNameError(true);
    }
  };
  const handleFeaturePriceChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setFeaturePrice(value);
      setFeaturePriceError(false);
    } else {
      setFeaturePriceError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!featureNameError) {
      dispatch(createFeature({ feature: featureName }))
        .unwrap()
        .then((response) => {
          console.log(response)
            setFeatureName("")
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 2000);
        })
        .catch((error) => {
          console.error("Create Feature Error:", error);
          alert("Failed to Add Feature: " + error.message);
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
          }, 2000);
        });
    

    }
   

  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", position: "relative", alignItems: "center" }}>
        <GradientIconButton onClick={() => navigate(-1)}>
          <IoArrowBackSharp />
        </GradientIconButton>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "28px",
            fontWeight: "700",
            color: "#630000",
          }}
        >
          Add Feature
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <TextField
              required
              label="Feature Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={featureName}
              onChange={handleFeatureNameChange}
              error={featureNameError}
              helperText={featureNameError ? "Only Alphabets are allowed" : " "}
            />
          </Grid>
          <Grid item md={6}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{
                backgroundColor: "#800336",
                fontFamily: "Red Hat Display,sans-serif",
                fontSize: 18,
                fontWeight: 600,
                textTransform: "none",
                marginTop: "16px",
                height: 55,
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog
        message={successMessage}
        showDialog={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </Box>
    </ThemeProvider>
  );
};
export default AddFeature;