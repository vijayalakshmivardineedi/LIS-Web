import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const RenewalPage = () => {
  const [planType, setPlanType] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [cost, setCost] = useState("");

  const handlePlanTypeChange = (event) => {
    const selectedPlanType = event.target.value;
    setPlanType(selectedPlanType);
    updateCost(selectedPlanType, planDuration);
  };

  const handlePlanDurationChange = (event) => {
    const selectedPlanDuration = event.target.value;
    setPlanDuration(selectedPlanDuration);
    updateCost(planType, selectedPlanDuration);
  };

  const updateCost = (selectedPlanType, selectedPlanDuration) => {
    let cost = "";
    if (
      selectedPlanType === "Standard" &&
      selectedPlanDuration === "6 months"
    ) {
      cost = "$100";
    } else if (
      selectedPlanType === "Standard" &&
      selectedPlanDuration === "1 year"
    ) {
      cost = "$180";
    } else if (
      selectedPlanType === "Premium" &&
      selectedPlanDuration === "6 months"
    ) {
      cost = "$150";
    } else if (
      selectedPlanType === "Premium" &&
      selectedPlanDuration === "1 year"
    ) {
      cost = "$280";
    }
    setCost(cost);
  };

  return (
    <Grid container spacing={3} sx={{ padding: "2%" }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif", fontWeight: "600" }}
        >
          Renewal
        </Typography>
      </Grid>
      <Grid sx={{ padding: "20px", width: "100%" }}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif", fontWeight: "600" }}
        >
          Society Details
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: "1%" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Society ID"
              value="S12345"
              fullWidth
              disabled
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Society Name"
              value="Green Valley Apartments"
              fullWidth
              disabled
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              value="01-02-2024"
              fullWidth
              disabled
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              value="01-02-2025"
              fullWidth
              disabled
              sx={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ marginBottom: "10px" }}>
              <InputLabel>Plan Type</InputLabel>
              <Select
                value={planType}
                onChange={handlePlanTypeChange}
                label="Plan Type"
              >
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Premium">Premium</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ marginBottom: "10px" }}>
              <InputLabel>Plan Duration</InputLabel>
              <Select
                value={planDuration}
                onChange={handlePlanDurationChange}
                label="Plan Duration"
              >
                <MenuItem value="6 months">6 Months</MenuItem>
                <MenuItem value="1 year">1 Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {cost && (
            <Grid item xs={12}>
              <TextField
                label="Cost"
                value={cost}
                fullWidth
                disabled
                sx={{ marginBottom: "10px" }}
              />
            </Grid>
          )}
        </Grid>
        <Button
          component={Link}
          to="/addresidential"
          variant="contained"
          sx={{
            backgroundColor: "#800336",
            "&:hover": {
              backgroundColor: "#800336",
            },
          }}
        >
          Renewal Plan
        </Button>
      </Grid>
    </Grid>
  );
};

export default RenewalPage;
