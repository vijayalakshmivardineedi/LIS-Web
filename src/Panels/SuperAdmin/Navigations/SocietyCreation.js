import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Button,
  Box,
  Chip,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
} from "@mui/material";
import Dialog from "../../../Dailogebox/DialogBox";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { societySignup } from "../../../Redux/Slice/SuperAdmin/societySlice";
import { fetchCities } from "../../../Redux/Slice/SuperAdmin/citiesSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from "@mui/material/styles";
import {
  getPlans,
} from "../../../Redux/Slice/SuperAdmin/getPlansSlice";
import { fetchFeatures } from "../../../Redux/Slice/SuperAdmin/FeaturesSlice";

const SocietyCreation = () => {
  const generateDummyTransactionId = () => {
    return "TX" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };
 const [price, setPrice] = useState("");
  const successMessage = useSelector((state) => state.society.successMessage);
  const errorMessage = useSelector((state) => state.society.error);
  const [showDialog, setShowDialog] = useState(false);
  const [city, setCity] = useState("");
  const [imageName, setImageName] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [blockName, setBlockName] = useState("");
  const [flatCount, setFlatCount] = useState("");
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(null);
  const [societyname, setSocietyname] = useState("");
  const [societymobilenumber, setSocietymobilenumber] = useState("");
  const [addressLine2, setAddressline2] = useState(null);
  const [addressLine1, setAddressline1] = useState(null);
  const [postalcode, setPostalcode] = useState(null);
  const [email, setEmail] = useState(null);
  const [uploadimage, setUploadimage] = useState(null);
  const [societyaddress, setSocietyaddress] = useState(null);
  const [state, setState] = useState(null);
  const [password, setPassword] = useState(null);
  const [selectedPlanFeatures, setSelectedPlanFeatures] = useState([]);

  const [currentBlockIndex, setCurrentBlockIndex] = useState(null);
  const [flatNumber, setFlatNumber] = useState("");
  const [licenseId, setlicenseId] = useState("");

  const [gateName, setGateName] = useState([]);
  const [planFeatures, setPlanFeatures] = useState([]);
  const [selectedGates, setSelectedGates] = useState([]);
  const [summary, setSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selplan, setSelPlan] = useState("");
  const [customizedPlans, setCustomizedPlans] = useState([]);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const navigate = useNavigate();
  const [dialogMessage, setDialogMessage] = useState("");

  const dispatch = useDispatch();
  const societyState = useSelector((state) => state.society);
  const { cities } = useSelector((state) => state.cities);

  const { Features } = useSelector((state) => state.features.features);
  const { plans } = useSelector((state) => state.plan);
  useEffect(() => {
    dispatch(fetchCities());
    dispatch(getPlans());
    dispatch(fetchFeatures());
  }, [dispatch]);

  const handlePlanChange = (event) => {
    const selectedPlanId = event.target.value;
    setSelectedPlan(selectedPlanId);

    if (selectedPlanId !== "Customized Plan") {
      const plan = plans.find((plan) => plan._id === selectedPlanId);
      setSelectedPlanFeatures(plan.features);
      setSelPlan(plan.plan);
    } else {
      setSelPlan("Customized Plan");
      setSelectedPlanFeatures([]);
    }
  };

  const handleProceedClick = async () => {
    let basePrice = 0;
    const dummyTransactionId = generateDummyTransactionId();

    if (validateFields()) {
      const formattedBlocks = blocks.map((block) => ({
        blockName: block.blockName,
        flats: block.flats.map((flat) => ({ flatNumber: flat })),
        flatCount: block.flats.length,
      }));

      const totalFlats = formattedBlocks.reduce(
        (total, block) => total + block.flatCount,
        0
      );

      if (selplan === "Standard Plan") {
        basePrice = 25;
      } else if (selplan === "Premium Plan") {
        basePrice = 30;
      } else if (selplan === "Customized Plan") {
        basePrice = 28;
      }

      const calculatedPrice = basePrice * totalFlats * 12;
      setPrice(calculatedPrice);

      const formData = {
        superAdminId: "6696350c5cdabf9fdeca6ae0",
        societyName: societyname,
        email,
        societyMobileNumber: societymobilenumber,
        societyImage: imageName,
        city,
        societyAdress: {
          addressLine1,
          addressLine2,
          state,
          postalCode: postalcode,
        },
        password,
        blocks: formattedBlocks,
        paymentStatus: "Completed",
        gates: selectedGates.map((gate) => gate.title),
        memberShip: selplan,
        paymentMethod,
        transactionId: dummyTransactionId,
        price: calculatedPrice.toString(),
        totalFlats,
        selectedFeatures :(selplan === "Customized Plan" ? customizedPlans : selectedPlanFeatures)
        // ...(selectedPlan === "Customized Plan" ? 
        //   {selectedFeatures: customizedPlans} : {selectedFeatures :selectedPlanFeatures}
        // ),
      };

      try {
        const response = await dispatch(societySignup(formData)).unwrap();
        // Since `unwrap` will return the fulfilled value or throw an error, handle accordingly
        setDialogMessage(response); // Show success message
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate("/superadmin/cities");
        }, 2000);
      } catch (error) {
        console.error("Create Society Error:", error);
        setDialogMessage(
          error.message || "An error occurred. Please try again later."
        );
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
      }
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#630000',
      },
    },
  });
  const GradientIconButton = styled(IconButton)(({ theme }) => ({
    background: "linear-gradient(to right,#FB0707, #630000)",
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

  console.log(price);
  const validateFields = () => {
    let tempErrors = {};
    
    if (!societyname) tempErrors.societyname = "Society Name is required";
    if (!email) tempErrors.email = "Email is required";
    if (!societymobilenumber) tempErrors.societymobilenumber = "Mobile number is required";
    if (!state) tempErrors.state = "State is required";
    if (!addressLine1) tempErrors.addressLine1 = "Address Line 1 is required";
    if (!addressLine2) tempErrors.addressLine2 = "Address Line 2 is required";
    if (!password) tempErrors.password = "Password is required";
    if (!postalcode) tempErrors.postalcode = "Postal code is required";
    // if (!gateName.length) tempErrors.gateName = "At least one gate is required";
    if (!city) tempErrors.city = "City is required";
    if (!imageName) tempErrors.imageName = "Image upload is required";
    if (!blockName && blocks.length === 0) tempErrors.blockName = "At least one block is required";
    if (!selectedPlan) tempErrors.selectedPlan = "Plan selection is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const gates = [
    { title: "Gate 1" },
    { title: "Gate 2" },
    { title: "Gate 3" },
    { title: "Gate 4" },
  ];

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadimage(file);
      setImageName(file);
    }
  };

  const handleCustomizedPlanChange = (event) => {
    const value = event.target.value;
    setCustomizedPlans((prev) =>
      prev.includes(value)
        ? prev.filter((plan) => plan !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = () => {
    const summaryText = blocks
      .map((block) => {
        return `${block.blockName}\nFlats: ${block.flats.join(", ")}`;
      })
      .join("\n\n");

    setSummary(summaryText);
    setSubmitted(true);
  };
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleBlockNameChange = (event) => {
    setBlockName(event.target.value);
    setErrors({ ...errors, blockName: "" });
  };

  const handleAddBlock = () => {
    if (blockName.trim() === "") {
      setErrors({ ...errors, blockName: "Block name cannot be empty" });
      return;
    }
    if (blocks.some((block) => block.blockName === blockName.trim())) {
      setErrors({ ...errors, blockName: "Block name already exists" });
      return;
    }
    const newBlock = { blockName: blockName.trim(), flats: [] };
    setBlocks([...blocks, newBlock]);
    setBlockName("");
  };

  const handleSelectBlock = (index) => {
    setSelectedBlockIndex(index);
  };

  const handleFlatChange = (event) => {
    setFlatNumber(event.target.value);
    setErrors({ ...errors, flatNumber: "" });
  };

  const handleAddFlat = () => {
    if (flatNumber.trim() === "") {
      setErrors({ ...errors, flatNumber: "Flat number cannot be empty" });
      return;
    }
    const updatedBlocks = [...blocks];
    const selectedBlock = updatedBlocks[selectedBlockIndex];
    if (selectedBlock.flats.includes(flatNumber.trim())) {
      setErrors({
        ...errors,
        flatNumber: "Flat number already exists in this block",
      });
      return;
    }
    selectedBlock.flats.push(flatNumber.trim());
    setBlocks(updatedBlocks);
    setFlatNumber("");
    setErrors({ ...errors, flatNumber: "" });
  };

  const handleDeleteBlock = (index) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);

    if (selectedBlockIndex === index) {
      setSelectedBlockIndex(null);
    } else if (selectedBlockIndex > index) {
      setSelectedBlockIndex(selectedBlockIndex - 1);
    }
  };

  const handleDeleteFlat = (flatToDelete) => {
    const updatedBlocks = [...blocks];
    const selectedBlock = updatedBlocks[selectedBlockIndex];
    selectedBlock.flats = selectedBlock.flats.filter(
      (flat) => flat !== flatToDelete
    );
    setBlocks(updatedBlocks);
  };
  const getFeatureName = (featureId) => {
    const feature = Features.find((feature) => feature._id === featureId);
    return feature ? feature.feature : "Unknown";
  };

  return (
    <ThemeProvider theme={theme}>
    <Grid container spacing={2} sx={{ fontFamily: "Montserrat, sans-serif", padding: "20px" }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Georgia, serif",
          fontWeight: "600",
          padding: "15px",
        }}
      >
        Society Creation
      </Typography>
      <Grid container spacing={2} sx={{ fontFamily: "Montserrat, sans-serif", padding: "20px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            onChange={(event) => setSocietyname(event.target.value)}
            label="Society Name"
            variant="outlined"
            required
            error={!!errors.societyName}
            helperText={errors.societyName}
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
          />
          <TextField
            fullWidth
            onChange={(event) => setSocietymobilenumber(event.target.value)}
            label="Society Mobile Number"
            variant="outlined"
            required
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
            error={!!errors.societyMobileNumber}
            helperText={errors.societyMobileNumber}
            inputProps={{ maxLength: 10 }}
            type="text"
            onInput={(event) => {
              event.target.value = event.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 10);
            }}
          />
          <FormControl fullWidth variant="outlined" sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}>
            <InputLabel>City*</InputLabel>
            <Select
              value={city}
              onChange={handleCityChange}
              label="City*"
              required
            >
              <MenuItem value="">Select</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city._id} value={city._id}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
            {errors.city && (
              <Typography color="error">{errors.city}</Typography>
            )}
          </FormControl>
          <TextField
            fullWidth
            label="Address Line 1*"
            onChange={(event) => setAddressline1(event.target.value)}
            variant="outlined"
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
            error={!!errors.addressLine2}
            helperText={errors.addressLine2}
          />
          <TextField
            fullWidth
            label="Address Line 2*"
            onChange={(event) => setAddressline2(event.target.value)}
            variant="outlined"
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
            error={!!errors.addressLine2}
            helperText={errors.addressLine2}
          />
          <TextField
            fullWidth
            onChange={(event) => setPostalcode(event.target.value)}
            label="Postal Code"
            variant="outlined"
            required
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
            error={!!errors.postalCode}
            helperText={errors.postalCode}
            inputProps={{ maxLength: 6, pattern: "[0-9]*" }}
            type="text"
            onInput={(event) => {
              event.target.value = event.target.value
                .replace(/[^0-9]/g, "")
                .slice(0, 6);
            }}
          />
          <Grid>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="gates-autocomplete"
                  options={gates}
                  getOptionLabel={(option) => option.title}
                  value={selectedGates}
                  onChange={(event, newValue) => setSelectedGates(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Gate Name"
                      placeholder="Select Gates"
                      error={!!errors.gateName}
                      helperText={errors.gateName}
                    />
                  )}
                  sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Select Plan*</InputLabel>
                  <Select
                    value={selectedPlan}
                    onChange={handlePlanChange}
                    label="Select Plan*"
                    required
                  >
                    {plans.map((plan) => (
                      <MenuItem key={plan._id} value={plan._id}>
                        {plan.plan}
                      </MenuItem>
                    ))}
                    <MenuItem value="Customized Plan">Customized Plan</MenuItem>
                  </Select>
                </FormControl>
                {selectedPlan && selectedPlan !== "Customized Plan" && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ fontFamily: "Montserrat, sans-serif", marginTop: 2 }}>
                        {selectedPlanFeatures.map((feature) => (
                          <>
                            <div key={feature._id}>
                              {getFeatureName(feature.featureId)}
                            </div>
                          </>
                        ))}
                      </Typography>
                    </Grid>
                  </>
                )}
                {selectedPlan === "Customized Plan" && (
                  <Grid item md={12}>
                    <FormControl component="fieldset" sx={{ fontFamily: "Montserrat, sans-serif", marginTop: 2 }}>
                      <Typography variant="body2" sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "bold" }}>
                        Select Custom Options:
                      </Typography>
                      {Features.map((feature) => (
                        <FormControlLabel
                          key={feature._id}
                          control={
                            <Checkbox
                              checked={customizedPlans.includes(
                                feature._id
                              )}
                              onChange={handleCustomizedPlanChange}
                              value={feature._id}
                            />
                          }
                          label={feature.feature}
                        />
                      ))}
                    </FormControl>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            label="Email"
            variant="outlined"
            required
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
            error={!!errors.email}
            helperText={errors.email}
          />
        <div style={{ position: "relative" }}>
  
              <TextField
                onChange={(event) => setImageName(event.target.value)}
                label="Upload Image"
                variant="outlined"
                placeholder={imageName.name}
                fullWidth
                required
                value={imageName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          component="span"
                          sx={{
                            backgroundColor: "#630000",
                            "&:hover": {
                              backgroundColor: "#630000",
                              color: "#fff",
                              borderColor: "#630000",
                            },
                          }}
                        >
                          Upload
                        </Button>
                      </label>
                    </InputAdornment>
                  ),
                }}
                sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
                error={!!errors.imageName}
                helperText={errors.imageName}
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={handleImageChange}
              />
            </div>
          <TextField
            fullWidth
            onChange={(event) => setState(event.target.value)}
            label="State"
            variant="outlined"
            required
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
            error={!!errors.state}
            helperText={errors.state}
          />
          <TextField
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            label="Password"
            variant="outlined"
            type="password"
            required
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Block Name"
            variant="outlined"
            value={blockName}
            onChange={handleBlockNameChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={handleAddBlock}
                    sx={{
                      backgroundColor: "#630000",
                      "&:hover": {
                        backgroundColor: "#630000",
                        color: "#fff",
                        borderColor: "#630000",
                      },
                    }}
                  >
                    Add Block
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
            error={!!errors.blockName}
            helperText={errors.blockName}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: 2,
            }}
          >
            {blocks.map((block, index) => (
              <Chip
                key={index}
                label={block.blockName}
                onClick={() => handleSelectBlock(index)}
                onDelete={() => handleDeleteBlock(index)}
                deleteIcon={<CloseIcon />}
                sx={{
                  backgroundColor:
                    selectedBlockIndex === index ? "#630000" : "#f0f0f0",
                  color: selectedBlockIndex === index ? "#fff" : "#000",
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </Box>
          {selectedBlockIndex !== null && (
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Flat Number"
                  variant="outlined"
                  value={flatNumber}
                  onChange={handleFlatChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          onClick={handleAddFlat}
                          sx={{
                            backgroundColor: "#630000",
                            "&:hover": {
                              backgroundColor: "#630000",
                              color: "#fff",
                              borderColor: "#630000",
                            },
                          }}
                        >
                          Add Flat
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.flatNumber}
                  helperText={errors.flatNumber}
                />
              </Grid>
            </Grid>
          )}
          {selectedBlockIndex !== null && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  overflow: "hidden",
                }}
              >
                {blocks[selectedBlockIndex].flats.map((flat, index) => (
                  <Chip
                    key={index}
                    label={flat}
                    onDelete={() => handleDeleteFlat(flat)}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      marginTop: 2,
                    }}
                  />
                ))}
              </Box>
            </Grid>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#630000",
              marginTop: 2,
              "&:hover": {
                backgroundColor: "#630000", // Ensure the hover color matches the default color
                opacity: 1, // Optional: to ensure no opacity change on hover
              },
            }}
          >
            Submit
          </Button>
          {submitted && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Summary"
                variant="outlined"
                value={summary}
                multiline
                readOnly
                sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2, marginTop: 2 }}
              />
            </Grid>
          )}

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value="ONLINE"
                  control={<Radio />}
                  label="Online"
                />
                <FormControlLabel
                  value="CASH"
                  control={<Radio />}
                  label="Cash"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#630000",
              "&:hover": {
                backgroundColor: "#630000", // Ensure the hover color matches the default color
                opacity: 1, // Optional: to ensure no opacity change on hover
              },
            }}
            onClick={handleProceedClick}
          >
            Proceed
          </Button>
          <Dialog
            message={successMessage || errorMessage}
            showDialog={showDialog}
            onClose={() => setShowDialog(false)}
          />
          <Grid></Grid>
        </Grid>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
};

export default SocietyCreation;


// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
//   InputAdornment,
//   Button,
//   Box,
//   Chip,
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   IconButton,
// } from "@mui/material";
// import Dialog from "../../../Dailogebox/DialogBox";
// import CloseIcon from "@mui/icons-material/Close";
// import Autocomplete from "@mui/material/Autocomplete";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { societySignup } from "../../../Redux/Slice/SuperAdmin/societySlice";
// import { fetchCities } from "../../../Redux/Slice/SuperAdmin/citiesSlice";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { styled } from "@mui/material/styles";
// import {
//   getPlans,
// } from "../../../Redux/Slice/SuperAdmin/getPlansSlice";
// import { fetchFeatures } from "../../../Redux/Slice/SuperAdmin/FeaturesSlice";

// const SocietyCreation = () => {
//   const generateDummyTransactionId = () => {
//     return "TX" + Math.random().toString(36).substr(2, 9).toUpperCase();
//   };
//  const [price, setPrice] = useState("");
//   const successMessage = useSelector((state) => state.society.successMessage);
//   const errorMessage = useSelector((state) => state.society.error);
//   const [showDialog, setShowDialog] = useState(false);
//   const [city, setCity] = useState("");
//   const [imageName, setImageName] = useState("");
//   const [blocks, setBlocks] = useState([]);
//   const [blockName, setBlockName] = useState("");
//   const [flatCount, setFlatCount] = useState("");
//   const [selectedBlockIndex, setSelectedBlockIndex] = useState(null);
//   const [societyname, setSocietyname] = useState("");
//   const [societymobilenumber, setSocietymobilenumber] = useState("");
//   const [addressLine2, setAddressline2] = useState(null);
//   const [addressLine1, setAddressline1] = useState(null);
//   const [postalcode, setPostalcode] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [uploadimage, setUploadimage] = useState(null);
//   const [societyaddress, setSocietyaddress] = useState(null);
//   const [state, setState] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [selectedPlanFeatures, setSelectedPlanFeatures] = useState([]);

//   const [currentBlockIndex, setCurrentBlockIndex] = useState(null);
//   const [flatNumber, setFlatNumber] = useState("");
//   const [licenseId, setlicenseId] = useState("");

//   const [gateName, setGateName] = useState([]);
//   const [planFeatures, setPlanFeatures] = useState([]);
//   const [selectedGates, setSelectedGates] = useState([]);
//   const [summary, setSummary] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState("");
//   const [selplan, setSelPlan] = useState("");
//   const [customizedPlans, setCustomizedPlans] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [paymentMethod, setPaymentMethod] = useState("ONLINE");
//   const navigate = useNavigate();
//   const [dialogMessage, setDialogMessage] = useState("");

//   const dispatch = useDispatch();
//   const societyState = useSelector((state) => state.society);
//   const { cities } = useSelector((state) => state.cities);

//   const { Features } = useSelector((state) => state.features.features);
//   const { plans } = useSelector((state) => state.plan);
//   useEffect(() => {
//     dispatch(fetchCities());
//     dispatch(getPlans());
//     dispatch(fetchFeatures());
//   }, [dispatch]);

//   const handlePlanChange = (event) => {
//     const selectedPlanId = event.target.value;
//     setSelectedPlan(selectedPlanId);

//     if (selectedPlanId !== "Customized Plan") {
//       const plan = plans.find((plan) => plan._id === selectedPlanId);
//       setSelectedPlanFeatures(plan.features);
//       setSelPlan(plan.plan);
//     } else {
//       setSelPlan("Customized Plan");
//       setSelectedPlanFeatures([]);
//     }
//   };

//   const handleProceedClick = async () => {
//     let basePrice = 0;
//     const dummyTransactionId = generateDummyTransactionId();

//     if (validateFields()) {
//       const formattedBlocks = blocks.map((block) => ({
//         blockName: block.blockName,
//         flats: block.flats.map((flat) => ({ flatNumber: flat })),
//         flatCount: block.flats.length,
//       }));

//       const totalFlats = formattedBlocks.reduce(
//         (total, block) => total + block.flatCount,
//         0
//       );

//       if (selplan === "Standard Plan") {
//         basePrice = 25;
//       } else if (selplan === "Premium Plan") {
//         basePrice = 30;
//       } else if (selplan === "Customized Plan") {
//         basePrice = 28;
//       }

//       const calculatedPrice = basePrice * totalFlats * 12;
//       setPrice(calculatedPrice);

//       const formData = {
//         superAdminId: "6696350c5cdabf9fdeca6ae0",
//         societyName: societyname,
//         email,
//         societyMobileNumber: societymobilenumber,
//         societyImage: imageName,
//         city,
//         societyAdress: {
//           addressLine1,
//           addressLine2,
//           state,
//           postalCode: postalcode,
//         },
//         password,
//         blocks: formattedBlocks,
//         paymentStatus: "Completed",
//         gates: selectedGates.map((gate) => gate.title),
//         memberShip: selplan,
//         paymentMethod,
//         transactionId: dummyTransactionId,
//         price: calculatedPrice.toString(),
//         totalFlats,
//         selectedFeatures :(selplan === "Customized Plan" ? customizedPlans : selectedPlanFeatures)
//         // ...(selectedPlan === "Customized Plan" && {
//         //   selectedFeatures: customizedPlans,
//         // }),
//       };

//       try {
//         const response = await dispatch(societySignup(formData)).unwrap();
//         // Since `unwrap` will return the fulfilled value or throw an error, handle accordingly
//         setDialogMessage(response); // Show success message
//         setShowDialog(true);
//         setTimeout(() => {
//           setShowDialog(false);
//           navigate("/superadmin/cities");
//         }, 2000);
//       } catch (error) {
//         console.error("Create Society Error:", error);
//         setDialogMessage(
//           error.message || "An error occurred. Please try again later."
//         );
//         setShowDialog(true);
//         setTimeout(() => {
//           setShowDialog(false);
//         }, 2000);
//       }
//     }
//   };
//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#630000',
//       },
//     },
//   });
//   const GradientIconButton = styled(IconButton)(({ theme }) => ({
//     background: "linear-gradient(to right,#FB0707, #630000)",
//     color: "#fff",
//     border: "1px solid #fff",
//     marginLeft: "10px",
//     marginRight: "10px",
//     "&:hover": {
//         background: "#FFF",
//         border: "1px solid #630000",
//         "& svg": {
//             color: "#630000",
//         },
//     },
//     "& svg": {
//         fontSize: "20px",
//     },
//   }));

//   console.log(price);
//   const validateFields = () => {
//     let tempErrors = {};
    
//     if (!societyname) tempErrors.societyname = "Society Name is required";
//     if (!email) tempErrors.email = "Email is required";
//     if (!societymobilenumber) tempErrors.societymobilenumber = "Mobile number is required";
//     if (!state) tempErrors.state = "State is required";
//     if (!addressLine1) tempErrors.addressLine1 = "Address Line 1 is required";
//     if (!addressLine2) tempErrors.addressLine2 = "Address Line 2 is required";
//     if (!password) tempErrors.password = "Password is required";
//     if (!postalcode) tempErrors.postalcode = "Postal code is required";
    
//     if (!city) tempErrors.city = "City is required";
//     if (!imageName) tempErrors.imageName = "Image upload is required";
//     if (!blockName && blocks.length === 0) tempErrors.blockName = "At least one block is required";
//     if (!selectedPlan) tempErrors.selectedPlan = "Plan selection is required";
    
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   }

//   const gates = [
//     { title: "Gate 1" },
//     { title: "Gate 2" },
//     { title: "Gate 3" },
//     { title: "Gate 4" },
//   ];

//   const handleCityChange = (event) => {
//     setCity(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImageName(file.name);
//     }
//   };

//   const handleCustomizedPlanChange = (event) => {
//     const value = event.target.value;
//     setCustomizedPlans((prev) =>
//       prev.includes(value)
//         ? prev.filter((plan) => plan !== value)
//         : [...prev, value]
//     );
//   };

//   const handleSubmit = () => {
//     const summaryText = blocks
//       .map((block) => {
//         return `${block.blockName}\nFlats: ${block.flats.join(", ")}`;
//       })
//       .join("\n\n");

//     setSummary(summaryText);
//     setSubmitted(true);
//   };
//   const handlePaymentMethodChange = (event) => {
//     setPaymentMethod(event.target.value);
//   };

//   const handleBlockNameChange = (event) => {
//     setBlockName(event.target.value);
//     setErrors({ ...errors, blockName: "" });
//   };

//   const handleAddBlock = () => {
//     if (blockName.trim() === "") {
//       setErrors({ ...errors, blockName: "Block name cannot be empty" });
//       return;
//     }
//     if (blocks.some((block) => block.blockName === blockName.trim())) {
//       setErrors({ ...errors, blockName: "Block name already exists" });
//       return;
//     }
//     const newBlock = { blockName: blockName.trim(), flats: [] };
//     setBlocks([...blocks, newBlock]);
//     setBlockName("");
//   };

//   const handleSelectBlock = (index) => {
//     setSelectedBlockIndex(index);
//   };

//   const handleFlatChange = (event) => {
//     setFlatNumber(event.target.value);
//     setErrors({ ...errors, flatNumber: "" });
//   };

//   const handleAddFlat = () => {
//     if (flatNumber.trim() === "") {
//       setErrors({ ...errors, flatNumber: "Flat number cannot be empty" });
//       return;
//     }
//     const updatedBlocks = [...blocks];
//     const selectedBlock = updatedBlocks[selectedBlockIndex];
//     if (selectedBlock.flats.includes(flatNumber.trim())) {
//       setErrors({
//         ...errors,
//         flatNumber: "Flat number already exists in this block",
//       });
//       return;
//     }
//     selectedBlock.flats.push(flatNumber.trim());
//     setBlocks(updatedBlocks);
//     setFlatNumber("");
//     setErrors({ ...errors, flatNumber: "" });
//   };

//   const handleDeleteBlock = (index) => {
//     const updatedBlocks = [...blocks];
//     updatedBlocks.splice(index, 1);
//     setBlocks(updatedBlocks);

//     if (selectedBlockIndex === index) {
//       setSelectedBlockIndex(null);
//     } else if (selectedBlockIndex > index) {
//       setSelectedBlockIndex(selectedBlockIndex - 1);
//     }
//   };

//   const handleDeleteFlat = (flatToDelete) => {
//     const updatedBlocks = [...blocks];
//     const selectedBlock = updatedBlocks[selectedBlockIndex];
//     selectedBlock.flats = selectedBlock.flats.filter(
//       (flat) => flat !== flatToDelete
//     );
//     setBlocks(updatedBlocks);
//   };
//   const getFeatureName = (featureId) => {
//     const feature = Features.find((feature) => feature._id === featureId);
//     return feature ? feature.feature : "Unknown";
//   };

//   return (
//     <ThemeProvider theme={theme}>
//     <Grid container spacing={2} sx={{ fontFamily: "Montserrat, sans-serif", padding: "20px" }}>
//       <Typography
//         variant="h4"
//         sx={{
//           fontFamily: "Georgia, serif",
//           fontWeight: "600",
//           padding: "15px",
//         }}
//       >
//         Society Creation
//       </Typography>
//       <Grid container spacing={2} sx={{ fontFamily: "Montserrat, sans-serif", padding: "20px" }}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             onChange={(event) => setSocietyname(event.target.value)}
//             label="Society Name"
//             variant="outlined"
//             required
//             error={!!errors.societyName}
//             helperText={errors.societyName}
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//           />
//           <TextField
//             fullWidth
//             onChange={(event) => setSocietymobilenumber(event.target.value)}
//             label="Society Mobile Number"
//             variant="outlined"
//             required
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//             error={!!errors.societyMobileNumber}
//             helperText={errors.societyMobileNumber}
//             inputProps={{ maxLength: 10 }}
//             type="text"
//             onInput={(event) => {
//               event.target.value = event.target.value
//                 .replace(/[^0-9]/g, "")
//                 .slice(0, 10);
//             }}
//           />
//           <FormControl fullWidth variant="outlined" sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}>
//             <InputLabel>City*</InputLabel>
//             <Select
//               value={city}
//               onChange={handleCityChange}
//               label="City*"
//               required
//             >
//               <MenuItem value="">Select</MenuItem>
//               {cities.map((city) => (
//                 <MenuItem key={city._id} value={city._id}>
//                   {city.name}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.city && (
//               <Typography color="error">{errors.city}</Typography>
//             )}
//           </FormControl>
//           <TextField
//             fullWidth
//             label="Address Line 1*"
//             onChange={(event) => setAddressline1(event.target.value)}
//             variant="outlined"
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//             error={!!errors.addressLine2}
//             helperText={errors.addressLine2}
//           />
//           <TextField
//             fullWidth
//             label="Address Line 2*"
//             onChange={(event) => setAddressline2(event.target.value)}
//             variant="outlined"
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//             error={!!errors.addressLine2}
//             helperText={errors.addressLine2}
//           />
//           <TextField
//             fullWidth
//             onChange={(event) => setPostalcode(event.target.value)}
//             label="Postal Code"
//             variant="outlined"
//             required
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//             error={!!errors.postalCode}
//             helperText={errors.postalCode}
//             inputProps={{ maxLength: 6, pattern: "[0-9]*" }}
//             type="text"
//             onInput={(event) => {
//               event.target.value = event.target.value
//                 .replace(/[^0-9]/g, "")
//                 .slice(0, 6);
//             }}
//           />
//           <Grid>
//             <Grid container spacing={1} alignItems="center">
//               <Grid item xs={12}>
//                 <Autocomplete
//                   multiple
//                   id="gates-autocomplete"
//                   options={gates}
//                   getOptionLabel={(option) => option.title}
//                   value={selectedGates}
//                   onChange={(event, newValue) => setSelectedGates(newValue)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Gate Name"
//                       placeholder="Select Gates"
//                       error={!!errors.gateName}
//                       helperText={errors.gateName}
//                     />
//                   )}
//                   sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth variant="outlined">
//                   <InputLabel>Select Plan*</InputLabel>
//                   <Select
//                     value={selectedPlan}
//                     onChange={handlePlanChange}
//                     label="Select Plan*"
//                     required
//                   >
//                     {plans.map((plan) => (
//                       <MenuItem key={plan._id} value={plan._id}>
//                         {plan.plan}
//                       </MenuItem>
//                     ))}
//                     <MenuItem value="Customized Plan">Customized Plan</MenuItem>
//                   </Select>
//                 </FormControl>
//                 {selectedPlan && selectedPlan !== "Customized Plan" && (
//                   <>
//                     <Grid item xs={12}>
//                       <Typography variant="body2" sx={{ fontFamily: "Montserrat, sans-serif", marginTop: 2 }}>
//                         {selectedPlanFeatures.map((feature) => (
//                           <>
//                             <div key={feature._id}>
//                               {getFeatureName(feature.featureId)}
//                             </div>
//                           </>
//                         ))}
//                       </Typography>
//                     </Grid>
//                   </>
//                 )}
//                 {selectedPlan === "Customized Plan" && (
//                   <Grid item md={12}>
//                     <FormControl component="fieldset" sx={{ fontFamily: "Montserrat, sans-serif", marginTop: 2 }}>
//                       <Typography variant="body2" sx={{ fontFamily: "Montserrat, sans-serif", fontWeight: "bold" }}>
//                         Select Custom Options:{price}
//                       </Typography>
                      
//                       {Features.map((feature) => (
//                         <FormControlLabel
//                           key={feature._id}
//                           control={
//                             <Checkbox
//                               checked={customizedPlans.includes(
//                                 feature._id
//                               )}
//                               onChange={handleCustomizedPlanChange}
//                               value={feature._id}
//                             />
//                           }
//                           label={feature.feature}
//                         />
//                       ))}
//                     </FormControl>
//                   </Grid>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             onChange={(event) => setEmail(event.target.value)}
//             fullWidth
//             label="Email"
//             variant="outlined"
//             required
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//             error={!!errors.email}
//             helperText={errors.email}
//           />
//         <div style={{ position: "relative" }}>
//       <TextField
//         onChange={(event) => setImageName(event.target.value)}
//         label="Upload Image"
//         variant="outlined"
//         fullWidth
//         required
//         value={imageName}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <label htmlFor="contained-button-file">
//                 <Button
//                   variant="contained"
//                   component="span"
//                   sx={{
//                     backgroundColor: "#630000",
//                     "&:hover": {
//                       backgroundColor: "#630000",
//                       color: "#fff",
//                       borderColor: "#630000",
//                     },
//                   }}
//                 >
//                   Upload
//                 </Button>
//               </label>
//             </InputAdornment>
//           ),
//         }}
//         sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//         error={!!errors.imageName}
//         helperText={errors.imageName}
//       />
//       <input
//         accept="image/*"
//         style={{ display: "none" }}
//         id="contained-button-file"
//         type="file"
//         onChange={handleImageChange}
//       />
//     </div>
//           <TextField
//             fullWidth
//             onChange={(event) => setState(event.target.value)}
//             label="State"
//             variant="outlined"
//             required
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//             error={!!errors.state}
//             helperText={errors.state}
//           />
//           <TextField
//             fullWidth
//             onChange={(event) => setPassword(event.target.value)}
//             label="Password"
//             variant="outlined"
//             type="password"
//             required
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//           />

//           <TextField
//             fullWidth
//             label="Block Name"
//             variant="outlined"
//             value={blockName}
//             onChange={handleBlockNameChange}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <Button
//                     variant="contained"
//                     onClick={handleAddBlock}
//                     sx={{
//                       backgroundColor: "#630000",
//                       "&:hover": {
//                         backgroundColor: "#630000",
//                         color: "#fff",
//                         borderColor: "#630000",
//                       },
//                     }}
//                   >
//                     Add Block
//                   </Button>
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2 }}
//             error={!!errors.blockName}
//             helperText={errors.blockName}
//           />
//           <Box
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: "8px",
//               marginBottom: 2,
//             }}
//           >
//             {blocks.map((block, index) => (
//               <Chip
//                 key={index}
//                 label={block.blockName}
//                 onClick={() => handleSelectBlock(index)}
//                 onDelete={() => handleDeleteBlock(index)}
//                 deleteIcon={<CloseIcon />}
//                 sx={{
//                   backgroundColor:
//                     selectedBlockIndex === index ? "#630000" : "#f0f0f0",
//                   color: selectedBlockIndex === index ? "#fff" : "#000",
//                   border: "1px solid #ccc",
//                 }}
//               />
//             ))}
//           </Box>
//           {selectedBlockIndex !== null && (
//             <Grid container spacing={1} alignItems="center">
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Flat Number"
//                   variant="outlined"
//                   value={flatNumber}
//                   onChange={handleFlatChange}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <Button
//                           variant="contained"
//                           onClick={handleAddFlat}
//                           sx={{
//                             backgroundColor: "#630000",
//                             "&:hover": {
//                               backgroundColor: "#630000",
//                               color: "#fff",
//                               borderColor: "#630000",
//                             },
//                           }}
//                         >
//                           Add Flat
//                         </Button>
//                       </InputAdornment>
//                     ),
//                   }}
//                   error={!!errors.flatNumber}
//                   helperText={errors.flatNumber}
//                 />
//               </Grid>
//             </Grid>
//           )}
//           {selectedBlockIndex !== null && (
//             <Grid item xs={12}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   gap: "8px",
//                   overflow: "hidden",
//                 }}
//               >
//                 {blocks[selectedBlockIndex].flats.map((flat, index) => (
//                   <Chip
//                     key={index}
//                     label={flat}
//                     onDelete={() => handleDeleteFlat(flat)}
//                     sx={{
//                       backgroundColor: "#f0f0f0",
//                       borderRadius: "4px",
//                       border: "1px solid #ccc",
//                       marginTop: 2,
//                     }}
//                   />
//                 ))}
//               </Box>
//             </Grid>
//           )}

//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             sx={{
//               backgroundColor: "#630000",
//               marginTop: 2,
//               "&:hover": {
//                 backgroundColor: "#630000", // Ensure the hover color matches the default color
//                 opacity: 1, // Optional: to ensure no opacity change on hover
//               },
//             }}
//           >
//             Submit
//           </Button>
//           {submitted && (
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Summary"
//                 variant="outlined"
//                 value={summary}
//                 multiline
//                 readOnly
//                 sx={{ fontFamily: "Montserrat, sans-serif", marginBottom: 2, marginTop: 2 }}
//               />
//             </Grid>
//           )}

//           <Box mt={4}>
//             <Typography variant="h6" gutterBottom>
//               Payment Method
//             </Typography>
//             <FormControl component="fieldset">
//               <RadioGroup
//                 name="paymentMethod"
//                 value={paymentMethod}
//                 onChange={handlePaymentMethodChange}
//               >
//                 <FormControlLabel
//                   value="ONLINE"
//                   control={<Radio />}
//                   label="Online"
//                 />
//                 <FormControlLabel
//                   value="CASH"
//                   control={<Radio />}
//                   label="Cash"
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Box>

//           <Button
//             variant="contained"
//             sx={{
//               marginTop: 2,
//               backgroundColor: "#630000",
//               "&:hover": {
//                 backgroundColor: "#630000", // Ensure the hover color matches the default color
//                 opacity: 1, // Optional: to ensure no opacity change on hover
//               },
//             }}
//             onClick={handleProceedClick}
//           >
//             Proceed
//           </Button>
//           <Dialog
//             message={successMessage || errorMessage}
//             showDialog={showDialog}
//             onClose={() => setShowDialog(false)}
//           />
//           <Grid></Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//     </ThemeProvider>
//   );
// };

// export default SocietyCreation;