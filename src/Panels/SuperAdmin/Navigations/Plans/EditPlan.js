import React, { useState, useEffect } from "react";
import {
  Typography,
  MenuItem,
  Select,
  Chip,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  TextField,
  IconButton,
  Box
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanById,
  updatePlan,
  deleteFeatureInPlan,
} from "../../../../Redux/Slice/SuperAdmin/getPlansSlice";
import { fetchFeatures } from "../../../../Redux/Slice/SuperAdmin/FeaturesSlice";
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
  background: "#630000",
  color: "#fff",
  border: "1px solid #fff",
  margin: "10px",
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

const Heading = styled(Typography)({
  fontWeight: "900",
  fontSize: "2rem",
  color: "#630000",
  fontFamily: "Georgia, serif",
  marginBottom: "20px",
});

const SubHeading = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  fontWeight: "700",
  fontSize: "1.5rem",
  color: "#630000",
  fontFamily: "Georgia, serif",
  marginBottom: "20px",
});

const SaveButton = styled(Button)({
  marginTop: "20px",
  background: "#630000",
  fontFamily: "Arial, sans-serif",
  "&:hover": {
    background: "#630000",
  },
});

const ChipsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "20px",
  maxWidth: "100%",
});

const EditPlan = () => {
  const { id } = useParams();
  const [selectedFeature, setSelectedFeature] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [features, setFeatures] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [planName, setPlanName] = useState("");
  const [showDialog, setShowDialog] = useState(false); // State for controlling dialog visibility
  const { planId, status, updateStatus, updateError } = useSelector((state) => state.plan);
  const { Features } = useSelector((state) => state.features.features);

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlanById(id))
      .unwrap()
      .then((data) => {
        setPlanName(data.plan);
        setFeatures(data.features.map((feature) => feature.featureId));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load plan details.");
        setLoading(false);
      });
  }, [dispatch, id]);

  const handlePlanNameChange = (event) => {
    setPlanName(event.target.value);
  };

  const handleDelete = (featureId) => () => {
    dispatch(deleteFeatureInPlan({ id, featureId }))
      .unwrap()
      .then(() => {
        dispatch(getPlanById(id))
          .unwrap()
          .then((data) => {
            setPlanName(data.plan);
            setFeatures(data.features.map((feature) => feature.featureId));
            setLoading(false);
          })
          .catch(() => {
            setError("Failed to load plan details.");
            setLoading(false);
          });
      })
      .catch(() => {
        setError("Failed to delete the feature.");
      });
  };

  const handleSave = () => {
    const featureIds = selectedFeatures.map((feature) => feature._id);
    dispatch(updatePlan({ id, plan: planName, featureIds }))
      .unwrap()
      .then(() => {
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/superadmin/plans");
        }, 2000);
      })
      .catch(() => {
        setError("Failed to save the plan.");
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
      });
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  const handleFeatureChange = (event) => {
    setSelectedFeatures(event.target.value);
  };

  const availableFeatures = Features?.filter(
    (feature) => !features?.map((f) => f._id).includes(feature._id)
  );

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
            Edit Plan
          </Typography>
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        <SubHeading>
          Features List
          <TextField
            label="Plan Name"
            variant="outlined"
            value={planName}
            onChange={handlePlanNameChange}
            style={{ minWidth: 200, marginTop: "20px" }}
          />
          <FormControl
            variant="outlined"
            style={{ marginTop: "20px", minWidth: 200 }}
          >
            <InputLabel id="feature-select-label">Select Feature</InputLabel>
            <Select
              labelId="feature-select-label"
              id="feature-select"
              multiple
              value={selectedFeatures}
              onChange={handleFeatureChange}
              renderValue={(selected) => (
                <div style={{ display: "none" }}> {/* Hide default rendering */}
                </div>
              )}
              label="Select Feature"
            >
              {availableFeatures.map((feature) => (
                <MenuItem key={feature._id} value={feature}>
                  {feature.feature}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SubHeading>
        <ChipsContainer>
          {selectedFeatures.map((feature) => (
            <Chip
              key={feature._id}
              label={feature.feature}
              style={{ margin: "5px" }}
              onDelete={() => setSelectedFeatures(prev => prev.filter(f => f._id !== feature._id))}
            />
          ))}
        </ChipsContainer>
        <ChipsContainer>
          {features.map((feature) => (
            <Chip
              key={feature._id}
              label={feature.feature}
              onDelete={handleDelete(feature._id)}
              style={{ margin: "5px" }}
            />
          ))}
        </ChipsContainer>
        <SaveButton variant="contained" color="primary" onClick={handleSave}>
          Save
        </SaveButton>
        <Dialog
          message={
            updateStatus === "succeeded"
              ? "Plan updated successfully"
              : updateError
          }
          showDialog={showDialog}
          onClose={() => setShowDialog(false)}
        />
      </Container>
    </ThemeProvider>
  );
};

export default EditPlan;
