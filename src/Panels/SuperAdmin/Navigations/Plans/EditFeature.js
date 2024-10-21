import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

import {
  fetchFeatureById,
  fetchFeatures,
  updateFeatureById,
} from "../../../../Redux/Slice/SuperAdmin/FeaturesSlice";
import Dialog from "../../../../Dailogebox/DialogBox";
import { IoArrowBackSharp } from "react-icons/io5";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#630000",
    },
  },
});
const GradientIconButton = styled(IconButton)(({ theme }) => ({
  background: "linear-gradient(to right,#630000, #630000)",
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

const EditFeature = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feature = useSelector((state) => state.features.features);
  const status = useSelector((state) => state.features.status);
  const error = useSelector((state) => state.features.error);
  const [showDialog, setShowDialog] = useState(false);
  const successMessage = useSelector((state) => state.features.successMessage);

  const [featureName, setFeatureName] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchFeatureById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (feature) {
      setFeatureName(feature?.Features?.feature || "");
    }
  }, [feature]);

  const handleFeatureNameChange = (e) => {
    setFeatureName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const featureData = { feature: featureName };

      dispatch(updateFeatureById({ id, featureData }))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
              dispatch(fetchFeatures());
             
            }, 2000);
          } else {
            setShowDialog(true);
            setTimeout(() => {
              setShowDialog(false);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
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
      <Box
        sx={{
          width: "100%",
          padding: "3px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{ display: "flex", position: "relative", alignItems: "center" }}
        >
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
            Update Feature
          </Typography>
        </Box>
      </Box>
      {status === "loading" && <Typography>Loading...</Typography>}
      {status === "failed" && <Typography>{error}</Typography>}
      {status === "succeeded" && (
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} md={6} sm={6}>
            <TextField
              label="Feature Id"
              variant="outlined"
              fullWidth
              disabled
              margin="normal"
              value={id}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "black",
                },
              }}
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <TextField
                label="Feature Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={featureName}
                onChange={handleFeatureNameChange}
              />
            </Grid>
            <Grid item md={6}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                style={{
                  backgroundColor: "#630000",
                  fontFamily: "Red Hat Display,sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  textTransform: "none",
                  marginTop: 15,
                  height: 55,
                }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
      <Dialog
        message={successMessage}
        showDialog={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </Box>
    </ThemeProvider>
  );
};

export default EditFeature;