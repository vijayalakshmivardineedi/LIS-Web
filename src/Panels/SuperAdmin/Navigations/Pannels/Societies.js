import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import { ArrowBack, Margin } from "@mui/icons-material";
import { fetchSocieties } from "../../../../Redux/Slice/SuperAdmin/societiesSlice"; // Import the thunk action
import FormControl from "@mui/material/FormControl";
import { fetchCities } from "../../../../Redux/Slice/SuperAdmin/citiesSlice";
import { IoArrowBackSharp } from "react-icons/io5";
import { display, height, maxHeight, styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ImagebaseURL } from "../../../SocietyAdmin/helpers/axios";

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#630000",
    },
  },
});

const cardStyle = () => ({
  background: "#f8e9dc",
  padding: "20px",
  borderRadius: "8px",
  color: "black",

  textAlign: "left",
  position: "relative",
  height: "auto",
  width: "100%",
  // transition: "transform 0.3s ease",
  cursor: "pointer",

});




const formatDateTime = (dateTime) => {
  if (!dateTime) return "";
  const date = new Date(dateTime);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-US", options).replace(",", "");
};

const Societies = () => {
  const { cityId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const cities = useSelector((state) => state.cities.cities);
  const { societies, status } = useSelector((state) => state.societies);

  useEffect(() => {
    dispatch(fetchCities());
  }
    , [dispatch]);

  useEffect(() => {
    if (cityId) {
      dispatch(fetchSocieties(cityId));
    }
  }, [dispatch, cityId]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredSocieties =
    Array.isArray(societies) && filter === "All"
      ? societies
      : Array.isArray(societies)
        ? societies.filter((society) => society.subscriptionModel === filter)
        : [];

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error fetching societies.</Typography>;
  }

  const getCityName = (cityId) => {
    const city = cities.find((city) => city._id === cityId);
    return city ? city.name : "Unknown";
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "10px" }}>

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
            <Typography variant="h4" gutterBottom style={{ marginTop: 6, fontFamily: "Georgia, serif", fontWeight: 600, color: "#630000" }}>
              Societies In {getCityName(cityId)}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 120, }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                onChange={handleFilterChange}
                variant="outlined"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Standard Plan">Standard Plan</MenuItem>
                <MenuItem value="Premium Plan">Premium Plan</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ marginTop: "25px" }}>
          {societies.societies ? (
            societies.societies.map((society) => (
              <Grid item xs={12} sm={6} md={4} key={society._id} sx={{ marginTop: "15px" }}>
                <Box
                  style={cardStyle(society.status === "Active")}
                  key={society._id}

                  onClick={() =>
                    navigate(
                      `/superadmin/societyDetails/${cityId}/${society._id}`
                    )
                  }
                >
                  <Box sx={{
                    display: "flex",
                    fontSize: "18px",
                  }}>
                    {/* <Avatar /> */}
                    <img
                      src={`${ImagebaseURL}${society.societyImage}`}
                      alt="img"
                      style={{
                        width: '100px',
                        height: '100px',
                        // borderRadius: '50%'
                      }}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                      <Typography >
                        {society.societyName}
                      </Typography>
                      <Typography sx={{
                        fontSize: "18px",
                      }}>
                         <strong>License ID:</strong> {society.licenseId || society.license}
                      </Typography>
                      <Typography sx={{
                        fontSize: "18px",
                        marginTop:2,
                      }}>
                        <strong>Subscription:</strong> {society.memberShip}
                      </Typography>

                    </Box>
                  </Box>
                  <Typography sx={{
                    fontSize: "18px",
                    marginTop: 1,
                    whiteSpace: "pre-line",
                  }}><strong>Address:</strong>
                    {society.societyAdress.addressLine1},{" "}
                    {society.societyAdress.addressLine2},{" "}
                    {society.societyAdress.state} -{" "}
                    {society.societyAdress.postalCode}
                  </Typography>

                </Box>
              </Grid>
            ))
          ) : (
            <Typography>No societies available.</Typography>
          )}
        </Grid>
        </Box>
    </ThemeProvider>
  );
};


export default Societies;