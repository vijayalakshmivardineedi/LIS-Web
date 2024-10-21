import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Switch,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "./SettingsSlice";
import Dialog from '../../DialogBox/DialogBox';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { fetchSocietyById } from "../../../../Redux/Slice/SuperAdmin/societydetailsSlice";
import { getPlans } from "../../../../Redux/Slice/SuperAdmin/getPlansSlice";
import { fetchFeatures } from "../../../../Redux/Slice/SuperAdmin/FeaturesSlice";
import { renewSocietyPlan } from "../../../../Redux/Slice/SuperAdmin/renewalSlice";

const SubmitButton = styled(Button)(({ theme }) => ({
  fontFamily: "Red Hat Display, sans-serif",
  backgroundColor: "#630000",
  color: "#fff",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#fff",
    color: "#630000",
    border: "1px solid #630000",
  },
}));

function Settings() {
  const dispatch = useDispatch();
  const today = new Date();
  const nextYear = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  );
  const successMessage = useSelector((state) => state.resetPassword.successMessage || state.renewal.successMessage);
  const errormessage = useSelector((state) => state.resetPassword.error || state.renewal.error);
  const { plans } = useSelector((state) => state.plan);
  const [expanded, setExpanded] = useState(0);

  const { society, status } = useSelector((state) => state.societyById);
  const [notificationSettings, setNotificationSettings] = useState({
    rental: true,
    residential: true,
    transaction: true,
    houseHolder: true,
    announcement: true,
    visitor: true,
    amenity: true,
  });
  const navigate = useNavigate();
  const [memberShip, setMemberShip] = useState("");
  const generateDummyTransactionId = () => {
    return "TX" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };
  const [price, setPrice] = useState("");
  const [customPlans, setCustomPlans] = useState({});

  const { features } = useSelector((state) => state.features);
  const [startDate, setStartDate] = useState(today.toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState(
    nextYear.toISOString().split("T")[0]
  );
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [preExpiry, setPreExpiry] = useState("");
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [societyAdmin, setSocietyAdmin] = useState(null);
  const [societyId, setSocietyId] = useState("");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    if (status === "succeeded") {
      setMemberShip(society.memberShip || "");
      setPreExpiry(society.expiryDate || "");
      setPrice(society.price || "");
      setCustomPlans(society.selectedFeatures)
    }
  }, [status, society]);
  useEffect(() => {
    const storedSocietyAdmin = localStorage.getItem("societyAdmin");
    if (storedSocietyAdmin) {
      const parsedAdmin = JSON.parse(storedSocietyAdmin);

      setSocietyAdmin(parsedAdmin);
      setSocietyId(parsedAdmin._id || "");
    }
  }, []);
  console.log(societyId)

  const toggleNotification = (type) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [type]: !prevSettings[type],
    }));
  };

  const handleNotificationToggle = () => {
    const newNotificationEnabled = !notificationEnabled;
    setNotificationEnabled(newNotificationEnabled);
    setNotificationSettings({
      rental: newNotificationEnabled,
      residential: newNotificationEnabled,
      transaction: newNotificationEnabled,
      houseHolder: newNotificationEnabled,
      announcement: newNotificationEnabled,
      visitor: newNotificationEnabled,
      amenity: newNotificationEnabled,
    });
  };
  useEffect(() => {
    dispatch(getPlans());
    dispatch(fetchFeatures());
  }, [dispatch]);
  useEffect(() => {
    if (societyId) {
      dispatch(fetchSocietyById(societyId));
    }
  }, [dispatch, societyId]);
  const handleSaveChanges = () => {
    setExpanded(false);
  };

  const switchStyles = {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#048c36",
      "&:hover": {
        backgroundColor: "rgba(0, 128, 0, 0.08)",
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#048c36",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#f51505",
    },
  };

  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
    passwordMismatch: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handlePlanTypeChange = async (event) => {
    const selectedMemberShip = event.target.value;
    setMemberShip(selectedMemberShip);

    if (selectedMemberShip !== "Customized Plan") {
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
  const handleSubmit = async () => {
    const errors = {
      currentPassword: formValues.currentPassword === "",
      newPassword: formValues.newPassword === "",
      confirmPassword: formValues.confirmPassword === "",
      passwordMismatch: formValues.newPassword !== formValues.confirmPassword,
    };
    setFormErrors(errors);
    const isValid = !Object.values(errors).some((error) => error);
    try {
      if (!errors.passwordMismatch) {
        if (isValid) {
          setExpanded(false);
        }
        const result = await dispatch(resetPassword({ currentPassword: formValues.currentPassword, password: formValues.newPassword, societyId }));
        if (result.type === "resetPassword/reset/fulfilled") {
          setFormValues({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          })
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
          }, 3000);
        }
        else {
          setShowDialog(true);
          setTimeout(() => {
            setShowDialog(false);
            setExpanded(false);
          }, 3000);
        }
      }
    } catch (error) {
      console.error(error)
    }

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
  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    setStartDate(formatDate(today));
    setExpiryDate(formatDate(nextYear));
  }, []);
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleCustomPlanChange = (featureId) => {
    setCustomPlans((prev) => {
      const currentPlans = Array.isArray(prev) ? prev : [];
      return currentPlans.includes(featureId)
        ? currentPlans.filter((id) => id !== featureId)
        : [...currentPlans, featureId];
    });
  };


  const handleSubmit1 = (e) => {
    console.log(customPlans);
    const dummyTransactionId = generateDummyTransactionId();
    e.preventDefault();
    const renewalData = {
      societyId,
      newPlan: memberShip,
      paymentMethod,
      paymentStatus: "Pending",
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
          setShowDialog(true)
          setTimeout(() => {
            setShowDialog(false);
            setExpanded(false);
          }, 3000);
          setCustomPlans({})
        }
      })
  };
  const isDisabled = today < new Date(preExpiry);
  return (
    <Grid container spacing={2} sx={{ p: 4 }}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === 1}
            onChange={handleChange(1)}
            sx={{ mb: 2, fontFamily: "Red Hat Display,sans-serif" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Notification Settings
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ fontFamily: "Red Hat Display, sans-serif" }}>
                <ListItem onClick={handleNotificationToggle}>
                  <ListItemText primary="Enable/Disable All Notifications" />
                  <Switch checked={notificationEnabled} sx={switchStyles} />
                </ListItem>
                {Object.keys(notificationSettings).map((key, index) => (
                  <ListItem key={key} onClick={() => toggleNotification(key)}>
                    <ListItemText
                      primary={`${index + 1}) ${key} Notification`}
                    />
                    <Switch
                      checked={notificationSettings[key]}
                      sx={{
                        ...switchStyles,
                        "& .MuiSwitch-track": {
                          backgroundColor: notificationSettings[key]
                            ? "green"
                            : "red",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <SubmitButton onClick={handleSaveChanges}>
                Save Changes
              </SubmitButton>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === 2}
            onChange={handleChange(2)}
            sx={{ mb: 2, fontFamily: "Red Hat Display, sans-serif" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              sx={{ fontFamily: "Red Hat Display, sans-serif" }}
            >
              Reset Password
            </AccordionSummary>
            <AccordionDetails
              sx={{ fontFamily: "Red Hat Display, sans-serif" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    type={showPassword.currentPassword ? "text" : "password"}
                    label="Current Password"
                    name="currentPassword"
                    value={formValues.currentPassword}
                    onChange={handleInputChange}
                    error={formErrors.currentPassword}
                    helperText={
                      formErrors.currentPassword
                        ? "Current password is required"
                        : ""
                    }
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              togglePasswordVisibility("currentPassword")
                            }
                          >
                            {showPassword.currentPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type={showPassword.newPassword ? "text" : "password"}
                    label="New Password"
                    name="newPassword"
                    value={formValues.newPassword}
                    onChange={handleInputChange}
                    error={formErrors.newPassword}
                    helperText={
                      formErrors.newPassword ? "New password is required" : ""
                    }
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              togglePasswordVisibility("newPassword")
                            }
                          >
                            {showPassword.newPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type={showPassword.confirmPassword ? "text" : "password"}
                    label="Confirm New Password"
                    name="confirmPassword"
                    value={formValues.confirmPassword}
                    onChange={handleInputChange}
                    error={
                      formErrors.confirmPassword || formErrors.passwordMismatch
                    }
                    helperText={
                      formErrors.confirmPassword
                        ? "Confirming your new password is required"
                        : formErrors.passwordMismatch
                          ? "Passwords do not match"
                          : ""
                    }
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              togglePasswordVisibility("confirmPassword")
                            }
                          >
                            {showPassword.confirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <SubmitButton onClick={handleSubmit}>
                      Save Changes
                    </SubmitButton>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === 3}
            onChange={handleChange(3)}
            sx={{ mb: 2, fontFamily: "Red Hat Display, sans-serif" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Renew License
            </AccordionSummary>
            <AccordionDetails>
              {society && society._id ? (
                <Grid
                  container
                  spacing={3}
                  sx={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <Grid item md={6}>
                    <TextField
                      label="Society ID"
                      value={society._id}
                      fullWidth
                      disabled={isDisabled}
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
                      disabled={isDisabled}
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
                                onChange={() => handleCustomPlanChange(option._id)}
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
                      disabled={isDisabled}
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
                      disabled={isDisabled}
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
                <Grid item md={12} sx={{textAlign: "center" }}>
                  <SubmitButton
                    variant="contained"
                    disabled={isDisabled}
                    onClick={handleSubmit1}
                  >
                    Submit
                  </SubmitButton>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {console.log(successMessage, errormessage)}
          <Dialog
            message={successMessage ? successMessage : "" || errormessage ? errormessage : ""}
            showDialog={showDialog}
            onClose={() => setShowDialog(false)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Settings;