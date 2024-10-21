import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
// import MVVImage from "../../../assets/MVV.png";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfilesBySocietyId } from "../../../Redux/Slice/SuperAdmin/userProfilesSlice";
import { fetchVisitorsBySocietyId } from "../../../Redux/Slice/SuperAdmin/visitorsSlice";
import { fetchCommunityHall, fetchGym, fetchPlayArea, fetchSwimmingPool } from "../../../Redux/Slice/SuperAdmin/amenitiesSlice";
import { fetchSocietyById } from "../../../Redux/Slice/SuperAdmin/societydetailsSlice";
import { IoArrowBackSharp } from "react-icons/io5";
import { margin, styled, width } from "@mui/system";
import { ImagebaseURL } from "../../SocietyAdmin/helpers/axios";

const cardStyle = {
  width: "100%", // Full width
  padding: "10px",
  boxSizing: "border-box",
};
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

const innerCardStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  background: "#fff",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.15)",
  border: "#630000",
  borderImage: "linear-gradient(235deg, #55001e, #fb0352) 1",
  boxSizing: "border-box",
  display: "flex",
};

const contentStyle = {
 margin:"20px",
 marginTop: "10px",
};

const imageStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "4px",
  marginRight: "20px",
};

const textContainerStyle = {
  
};

const carouselContainerStyle = {
  width: "30%",
  padding: "10px",
  boxSizing: "border-box",
};

const carouselImageStyle = {
  width:"100%",
  
};

const squareCardStyle = {
  flex: "1 1 calc(20% - 20px)",
  maxWidth: "calc(25% - 20px)",
  height: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#f8e9dc",
  borderRadius: "6px",
  margin: "20px",
  color: "#000",
  boxSizing: "border-box",
};

const bigNumberStyle = {
  fontSize: "1.5rem",
  marginBottom: "10px",
};

const fullWidthCardStyle = {
  width: "100%",
  padding: "10px",
  boxSizing: "border-box",
};

const SocietyDetails = () => {
  const { id, cityId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { society } = useSelector((state) => state.societyById);
  const visitors = useSelector((state) => state.visitors.visitors);
  const userProfiles = useSelector((state) => state.UserProfile.profiles);
  const status = useSelector((state) => state.society.status);
  const error = useSelector((state) => state.society.error);
  const amenities = useSelector((state) => state.amenities.amenities);

  useEffect(() => {
    dispatch(fetchSocietyById(id));
    dispatch(fetchUserProfilesBySocietyId(id));
    dispatch(fetchVisitorsBySocietyId(id));
    dispatch(fetchCommunityHall());
    dispatch(fetchPlayArea());
    dispatch(fetchGym());
    dispatch(fetchSwimmingPool());
  }, [dispatch, id]);

  if (status === "loading") {
    return <Typography>Loading...</Typography>;
  }

  if (status === "failed") {
    return <Typography>Error: {error}</Typography>;
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
     

      <Box sx={{ display: "flex", position: "relative", alignItems: "center", marginTop: 3, marginBottom: 3 }}>
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
          Details
        </Typography>
      </Box>

      <Box sx={{ display: "flex" }}>
  <Box sx={cardStyle}>
    <Box sx={innerCardStyle} id="main-card">
      <Box
        sx={{
          ...carouselContainerStyle,
          marginBottom: 0, // Reduce or remove bottom margin
          paddingBottom: 0, // Reduce or remove bottom padding
        }}
      >
        {society &&
          society.societyImage &&
          society.societyImage.map((image, index) => (
            <div className="carousel-image" key={index}>
              <img
                src={`${ImagebaseURL}${image}`}
                alt={`Slide ${index}`}
                style={carouselImageStyle}
              />
            </div>
          ))}
      </Box>
      <Box
        sx={{
          ...contentStyle,
          marginTop: 0, // Reduce or remove top margin
          paddingTop: 0, // Reduce or remove top padding
        }}
      >
        <Box sx={textContainerStyle}>
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {society ? society.societyName : "Apartment Name"}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <b>License ID:</b> {society ? society.licenseId : "XXXXXXXX"}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {society
              ? `${formatDate(society.startDate)} - ${formatDate(
                  society.expiryDate
                )}`
              : "10/03/2024 - 11/DD/YYYY"}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <b>Subscription Type:</b>{" "}
            {society ? society.memberShip : "Premium"}
          </Typography>
          <Typography
            variant="body1"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <b>Address:</b>{" "}
            {society
              ? `${society.societyAdress.addressLine1}, ${society.societyAdress.addressLine2}, ${society.societyAdress.state}, ${society.societyAdress.postalCode}`
              : "Apartment Address, City, State, ZIP Code"}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
</Box>

      
      <Typography
        variant="h4"
        gutterBottom
        style={{
          padding: "10px",
          marginTop: "20px",
          fontFamily: "Georgia, serif",
        }}
      >
        Apartment Management
      </Typography>
      <Box sx={fullWidthCardStyle}>
        <Box sx={innerCardStyle}>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={squareCardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Number of Blocks
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}
              >
                {society && society.blocks ? society.blocks.length : "0"}
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Total Flats
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}
              >
                {society && society.blocks
                  ? society.blocks.reduce(
                    (total, block) => total + block.flats.length,
                    0
                  )
                  : "0"}
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Total Gates
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}
              >
                {society && society.gates ? society.gates.length : "0"}
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Total Users
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}
              >
                {userProfiles ? userProfiles.length : "120"}
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Amenities
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}
              >
                {amenities.length>=0
                  ? amenities.communityHall?.length || 0 + amenities.playArea?.length || 0 + amenities.gym?.length || 0 + amenities.swimmingPool?.length || 0
                  : "0"}
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Active Security Guards
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}
              >
                {society && society.securityGuards ? society.securityGuards.length : "0"}
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Daily Services
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}
              >
                {society && society.dailyServices ? society.dailyServices.length : "0"}
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontFamily: "Arial, sans-serif", fontWeight: 600 }}
              >
                Total Visitors
              </Typography>
              <Typography
                variant="h3"
                gutterBottom
                style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}
              >
                {visitors ? visitors.length : "0"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SocietyDetails;