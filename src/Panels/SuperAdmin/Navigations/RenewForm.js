import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { renewSocietyPlan } from "../../../Redux/Slice/SuperAdmin/renewalSlice";
import { fetchSocietyById } from "../../../Redux/Slice/SuperAdmin/societydetailsSlice";
import { useParams } from "react-router-dom";
import { fetchFeatures } from "../../../Redux/Slice/SuperAdmin/FeaturesSlice";
import { getPlans } from "../../../Redux/Slice/SuperAdmin/getPlansSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
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

const RenewForm = () => {
  const { societyId } = useParams();
  const today = new Date();
  const nextYear = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  );

  const [memberShip, setMemberShip] = useState("");
  const [price, setPrice] = useState("");
  const [customPlans, setCustomPlans] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [startDate, setStartDate] = useState(today.toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState(
    nextYear.toISOString().split("T")[0]
  );

  const generateDummyTransactionId = () => {
    return "TX" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const dispatch = useDispatch();
  const { plans } = useSelector((state) => state.plan);
  const { features } = useSelector((state) => state.features);
  const { society, status } = useSelector((state) => state.societyById);

  useEffect(() => {
    dispatch(getPlans());
    dispatch(fetchFeatures());
  }, [dispatch]);

  useEffect(() => {
    if (societyId) {
      dispatch(fetchSocietyById(societyId));
    }
  }, [dispatch, societyId]);

  useEffect(() => {
    if (status === "succeeded") {
      setMemberShip(society.memberShip || "");
      setPrice(society.price || "");
      setCustomPlans(society.selectedFeatures)
    }
  }, [status, society]);
  const handlePlanTypeChange = async (event) => {
    const selectedMemberShip = event.target.value;
    setMemberShip(selectedMemberShip);

    if (selectedMemberShip !== "Customized Plan") {
      // Assuming plans is an array of objects where each object represents a plan
      const selectedPlan = plans.find(plan => plan.plan === selectedMemberShip);
      console.log(selectedPlan)
      if (selectedPlan && selectedPlan.features) {
        const featureIds = selectedPlan.features.map(feature => feature._id);
        setCustomPlans(featureIds);
      } else {
        setCustomPlans([]);
      }
      updateCost(selectedMemberShip, selectedFeatures);
    } else {
      updateCost(selectedMemberShip);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // const handleCustomPlanChange = (event) => {
  //   const value = event.target.value;
  //   console.log("value", value)
  //   setCustomPlans((prev) => {
  //     const currentPlans = Array.isArray(prev) ? prev : [];
  //     return currentPlans.includes(value)
  //       ? currentPlans.filter((plan) => plan !== value)
  //       : [...currentPlans, value];

  //   });
  // };
const handleCustomPlanChange = (featureId) => {
  setCustomPlans((prev) => {
    const currentPlans = Array.isArray(prev) ? prev : [];
    return currentPlans.includes(featureId)
      ? currentPlans.filter((id) => id !== featureId)
      : [...currentPlans, featureId];
  });
};

  const updateCost = (memberShip) => {
    let basePrice = 0;
    const formattedBlocks = society.blocks.map((block) => ({
      blockName: block.blockName,
      flats: block.flats.map((flat) => ({ flatNumber: flat })),
      flatCount: block.flats.length,
    }));
    const totalFlats = formattedBlocks.reduce(
      (total, block) => total + block.flatCount,
      0
    );
    if (memberShip === "Standard Plan") {
      basePrice = 25;
    } else if (memberShip === "Premium Plan") {
      basePrice = 30;
    } else if (memberShip === "Customized Plan") {
      basePrice = 32;
    }
    const calculatedPrice = basePrice * totalFlats * 12;
    setPrice(calculatedPrice);
  };

  const handleSubmit = (e) => {
    console.log(customPlans);
    const dummyTransactionId = generateDummyTransactionId();
    e.preventDefault();
    const renewalData = {
      societyId,
      newPlan: memberShip,
      paymentMethod,
      paymentStatus: "Completed",
      selectedFeatures: customPlans,
      transactionId: dummyTransactionId,
      price: String(price),
      startDate,
      expiryDate,
    };
    dispatch(renewSocietyPlan(renewalData))
      .then((response) => {
        console.log(response)
        if (response.type === "renewal/renewPlan/fulfilled") {
          setCustomPlans({})
        }
      })
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
              Renewal Plan
            </Typography>
          </Box>
        </Box>
        {society && society._id ? (
          <Grid
            container
            spacing={3}
            sx={{ marginTop: 2, fontFamily: "Montserrat, sans-serif" }}
          >
            <Grid item md={6}>
              <TextField
                label="Society ID"
                value={society._id}
                fullWidth
                disabled
                sx={{
                  marginBottom: "10px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Society Name"
                value={society.societyName || ""}
                fullWidth
                disabled
                sx={{
                  marginBottom: "10px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="License ID"
                value={society.licenseId || ""}
                fullWidth
                disabled
                sx={{
                  marginBottom: "10px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl
                fullWidth
                sx={{
                  marginBottom: "10px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <InputLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Membership
                </InputLabel>
                <Select
                  value={memberShip}
                  onChange={handlePlanTypeChange}
                  label="Membership"
                  sx={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {plans.map((plan) => (
                    <MenuItem
                      key={plan._id}
                      value={plan.plan}
                      onClick={() => setSelectedFeatures(plan.features)}
                      sx={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {plan.plan}
                    </MenuItem>
                  ))}
                  <MenuItem
                    value="Customized Plan"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    Customized Plan
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {memberShip === "Customized Plan" && (
              <Grid item md={12}>
                {features.Features.map((option) => (
                  <FormControl component="fieldset" sx={{ fontFamily: "Montserrat, sans-serif", marginTop: 2 }}>
                    <FormControlLabel
                      key={option._id}
                      control={
                        <Checkbox
                          checked={Array.isArray(customPlans) && customPlans.includes(option._id)}
                          onChange={()=>handleCustomPlanChange(option._id)}
                          value={option._id}
                        />
                      }
                      label={option.feature}
                    />
                  </FormControl>
                ))}
              </Grid>
            )}
            <Grid item md={6}>
              <TextField
                label="Price"
                value={price}
                fullWidth
                onChange={handlePriceChange}
                sx={{
                  marginBottom: "10px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Start Date"
                value={startDate}
                fullWidth
                disabled
                sx={{
                  marginBottom: "10px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                label="Expiry Date"
                value={expiryDate}
                fullWidth
                disabled
                sx={{
                  marginBottom: "10px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl
                fullWidth
                sx={{
                  marginBottom: "10px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <InputLabel sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  Payment Method
                </InputLabel>
                <Select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  label="Payment Method"
                  sx={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <MenuItem
                    value="CASH"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    CASH
                  </MenuItem>
                  <MenuItem
                    value="CARD"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    CARD
                  </MenuItem>
                  <MenuItem
                    value="ONLINE"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    ONLINE
                  </MenuItem>
                  <MenuItem
                    value="UPI"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    UPI
                  </MenuItem>
                  <MenuItem
                    value="NETBANKING"
                    sx={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    NETBANKING
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        ) : null}
        <Grid
          container
          spacing={2}
          sx={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {/* <Grid item md={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#630000",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#630000",
                },
                fontFamily: "Montserrat, sans-serif",
              }}
              onClick={() => setShowPayment(true)}
            >
              Make Payment
            </Button>
          </Grid> */}
          <Grid item md={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#630000",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#630000",
                },
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider >
  );
};

export default RenewForm;