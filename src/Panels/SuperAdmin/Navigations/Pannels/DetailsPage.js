import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import MVVImage from "../../../assets/MVV.png";
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  width: '70%', // Restricted width to 70%
  padding: '10px',
  boxSizing: 'border-box',
};

const fullWidthCardStyle = {
  width: '100%', // Full width
  padding: '10px',
  boxSizing: 'border-box',
};

const innerCardStyle = {
  width: '100%', // Full width
  padding: '10px', // Increased padding for better visibility
  borderRadius: '6px', // Rounded corners for the inner card
  background: '#fff', // White background for the card
  boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.15)',
  border: '1px solid transparent', // Transparent border initially
  borderImage: 'linear-gradient(235deg, #55001e, #fb0352) 1', // Gradient border
  boxSizing: 'border-box', // Ensure padding is included in the width
};

const contentStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  marginTop: '10px', // Space between image and text
};

const imageStyle = {
  width: '184px', // Increased image size
  height: '184px', // Increased image size
  borderRadius: '4px', // Rounded corners for the image
  marginRight: '20px', // Space between image and text
};

const textContainerStyle = {
  flex: 1,
};

const squareCardStyle = {
  flex: '1 1 calc(25% - 20px)', // Flex basis with space between cards
  maxWidth: 'calc(25% - 20px)',
  height: '150px', // Increased height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(235deg, #55001e, #fb0352)',
  borderRadius: '6px',
  margin: '10px', // Gap between cards
  color: '#fff',
  boxSizing: 'border-box',
};

const bigNumberStyle = {
  fontSize: '2.5rem', // Larger font size for the big number
  fontWeight: 'bold',
  marginBottom: '10px', // Space below the big number
};

const carouselContainerStyle = {
  width: '30%', // The remaining width for the carousel
  padding: '10px',
  boxSizing: 'border-box',
};

const carouselImageStyle = {
  maxWidth: '78%', // Set maximum width to maintain aspect ratio
  maxHeight: '78%', // Set maximum height to maintain aspect ratio
   // Maintain aspect ratio and cover the carousel slide
};

const DetailsPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom style={{ display: 'flex', alignItems: 'center', padding: '10px', fontFamily: "Georgia, serif" }}>
        <IconButton onClick={() => navigate('/superadmin/societies')} style={{ color: 'black' }}>
          <ArrowBack />
        </IconButton>
        Details
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Box sx={cardStyle}>
          <Box sx={innerCardStyle} id="main-card">
            <Box sx={contentStyle}>
              <Avatar src={MVVImage} sx={imageStyle} />
              <Box sx={textContainerStyle}>
                <Typography variant="h4" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                  Apartment Name
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                  <b>License ID:</b> XXXXXXXX
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                  10/03/2024 - 11/DD/YYYY
                </Typography>
                <Typography variant="body1" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                  <b>Subscription Type:</b> Premium
                </Typography>
                <Typography variant="body1" style={{ fontFamily: "Arial, sans-serif" }}>
                  <b>Address:</b> Apartment Address, City, State, ZIP Code
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={carouselContainerStyle}>
          <Carousel
            showArrows
            showThumbs={false}
            autoPlay={false}
            infiniteLoop
            dynamicHeight={false}
          >
            <div className="carousel-image">
              <img src={MVVImage} alt="MVV" style={carouselImageStyle} />
            </div>
            <div className="carousel-image">
              <img src={MVVImage} alt="MVV" style={carouselImageStyle} />
            </div>
          </Carousel>
        </Box>
      </Box>
      <Typography variant="h4" gutterBottom style={{ padding: '10px', marginTop: '20px', fontFamily: "Georgia, serif" }}>
        Apartment Management
      </Typography>
      <Box sx={fullWidthCardStyle}>
        <Box sx={innerCardStyle}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {/* First Row of Sub-cards */}
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Number of Blocks
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                2
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Total Flats
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                100
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Total Gates
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                2
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Total Users
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                100
              </Typography>
            </Box>
            {/* Second Row of Sub-cards */}
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Number of Amenities
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                5
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Total Assets
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                5
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Total Rental
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                1
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Number of
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                2
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Typography variant="h4" gutterBottom style={{ padding: '10px', marginTop: '20px', fontFamily: "Georgia, serif" }}>
        Visitor Management
      </Typography>
      <Box sx={fullWidthCardStyle}>
        <Box sx={innerCardStyle}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {/* Sub-cards for Security Management */}
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Total Visitors Per mounth
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                4128
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Avg Guests per Month 
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                2998
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Avg Staff per Month
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                1254
              </Typography>
            </Box>
            <Box sx={squareCardStyle}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: "Arial, sans-serif" }}>
                Avg Dialy Visitor
              </Typography>
              <Typography variant="h3" gutterBottom style={{ ...bigNumberStyle, fontFamily: "Arial, sans-serif" }}>
                420
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsPage;