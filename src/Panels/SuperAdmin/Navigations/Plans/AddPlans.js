import React, { useEffect, useState } from "react";
import {
  Typography,
  MenuItem,
  Select,
  Chip,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Box,
  IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatures } from "../../../../Redux/Slice/SuperAdmin/FeaturesSlice";
import { createPlan } from "../../../../Redux/Slice/SuperAdmin/PlansSlice";
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

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "20px",
  height: "100vh",
  width: "100%",
  fontFamily: "Arial, sans-serif",
});

const ChipsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: "20px",
  maxHeight: "300px",
  overflowY: "auto",
  width: "100%",
});

const InputRow = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "10px",
});

const CreateButton = styled(Button)({
  marginTop: "20px",
  alignSelf: "flex-start",
  background: "#630000",
  fontFamily: "Arial, sans-serif",
  "&:hover": {
    background: "#630000",
  },
});

const AddPlans = () => {
  const [planName, setPlanName] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");
  const [features, setFeatures] = useState([]);
  const [cost, setCost] = useState("");
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const { features: FeaturesList, status: featuresStatus } = useSelector(
    (state) => state.features
  );
  const { status: planStatus, error: planError, successMessage } = useSelector(
    (state) => state.addPlan
  );

  useEffect(() => {
    if (featuresStatus === "idle") {
      dispatch(fetchFeatures());
    }
  }, [featuresStatus, dispatch]);

  useEffect(() => {
    if (FeaturesList && FeaturesList.Features) {
      const initialFeature = FeaturesList.Features.find(
        (f) => f._id === selectedFeature
      );
      if (initialFeature) {
        setCost(initialFeature.cost);
      }
    }
  }, [FeaturesList, selectedFeature]);

  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  };

  const handleFeatureChange = (event) => {
    const featureId = event.target.value;
    const feature = FeaturesList.Features.find((f) => f._id === featureId);

    if (feature && !features.some((f) => f._id === featureId)) {
      setFeatures([...features, feature]);
      setSelectedFeature(featureId);
      setCost(feature.cost);
    }
  };

  const handleDelete = (featureToDelete) => () => {
    setFeatures((chips) =>
      chips.filter((feature) => feature._id !== featureToDelete._id)
    );
    if (features.some((f) => f._id === featureToDelete._id)) {
      setCost("");
    }
  };

  const handleSave = () => {
    if (planName === "" || features.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPlan = {
      plan: planName,
      features: features.map((f) => f._id),
    };

    dispatch(createPlan(newPlan))
      .unwrap()
      .then((response) => {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate('/superadmin/plans');
        }, 2000);
      })
      .catch((error) => {
        console.error('Create Plan Error:', error);
        alert('Failed to Add Plan: ' + (error.message || 'Unknown error'));
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
      });
  };

  return (
    <ThemeProvider theme={theme}>
    <Container>
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
              Add Plan
            </Typography>
          </Box>
        </Box>

      <TextField
        label="Plan Name"
        variant="outlined"
        value={planName}
        onChange={handlePlanNameChange}
        style={{ minWidth: 200, marginTop: "20px" }}
      />

      <Typography
        variant="h5"
        component="div"
        style={{
          marginTop: "20px",
          fontWeight: "700",
          fontSize: "1.5rem",
          color: "#630000",
          fontFamily: "Georgia, serif",
        }}
      >
        Features
      </Typography>

      <InputRow>
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel id="feature-label">Select Feature</InputLabel>
          <Select
            labelId="feature-label"
            id="feature-select"
            value={selectedFeature}
            onChange={handleFeatureChange}
            label="Select Feature"
          >
            {FeaturesList &&
              FeaturesList.Features &&
              FeaturesList.Features.map((feature) => (
                <MenuItem key={feature._id} value={feature._id}>
                  {feature.feature}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </InputRow>
      <ChipsContainer>
        {features.map((feature) => (
          <Chip
            key={feature._id}
            label={feature.feature}
            onDelete={handleDelete(feature)}
            style={{ margin: "5px 0" }}
          />
        ))}
      </ChipsContainer>

      <CreateButton variant="contained" onClick={handleSave}>
        Create
      </CreateButton>
      <Dialog
        message={planStatus === 'succeeded' ? successMessage : planError}
        showDialog={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </Container>
    </ThemeProvider>
  );
};

export default AddPlans;