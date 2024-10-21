import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCities, createCity, deleteCity } from "../../../Redux/Slice/SuperAdmin/citiesSlice";
import {
  Grid,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ImagebaseURL } from "../../SocietyAdmin/helpers/axios";
const theme = createTheme({
  palette: {
    primary: {
      main: "#630000",
    },
  },
});
// Styles
const boxStyle = {
  padding: "20px",
};

const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  borderRadius: "4px",
  padding: "5px",
  borderWidth: 1,
  borderColor: "#630000",
};

const cardContainerStyle = {
  position: "relative",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  backgroundColor: "#F8E9DC",
};

const iconContainerStyle = {
  position: "relative",
  height: "150px",
};

const iconImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const textContainerStyle = {
  padding: "10px",
};

const imagePreviewStyle = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
};

const cardTextStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "#F8E9DC",
  padding: "5px",
  borderRadius: "4px",
};

const Cities = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);
  const status = useSelector((state) => state.cities.status);
  const error = useSelector((state) => state.cities.error);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCities());
    }
  }, [status, dispatch]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setDialogOpen(true);
    }
  };

  

  const handleCloseDialog = async (action) => {
    if (action === "add" && selectedImage && imageName) {
      try {
        const result = await dispatch(createCity({ name: imageName, file: selectedImage }));
        console.log(result);
        if (result.type === "cities/createCity/fulfilled") {
          setSuccessDialogOpen(true);
        }
        else {
          console.log(error)

          setErrorMessage(error || "Failed to add city");
          setErrorDialogOpen(true);
        }
      } catch (error) {
        console.log(error)

      }
    }
    setDialogOpen(false);
    setSelectedImage(null);
    setImageName("");
  };

  const handleNameChange = (event) => {
    setImageName(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenMenu = (event, cityId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCityToDelete(cityId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setCityToDelete(null);
  };

  const handleDeleteCity = () => {
    dispatch(deleteCity(cityToDelete))
      .then(() => {
        handleCloseMenu();
      })
      .catch(() => {
        // Handle error if necessary
      });
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleAddButtonClick = () => {
    fileInputRef.current.click();
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
    <Box style={boxStyle}>
      <Box display="flex" alignItems="center" marginBottom="30px">
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontFamily: "Georgia, serif", color: "#630000", fontWeight: "600", marginTop: 1 }}
            >
              Cities
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box style={searchBoxStyle}>
              <SearchIcon style={{ marginRight: "10px", color: "#630000" }} />
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{
                marginLeft: 2,
                color: "#630000",
                border: "2px solid #630000",
                fontWeight: "600",
                fontFamily: "Georgia, serif",
                "&:hover": {
                  backgroundColor: "#630000",
                  color: "#fff",
                  borderColor: "#630000",
                  fontFamily: "Georgia, serif",
                },
              }}
              onClick={handleAddButtonClick}
            >
              ADD
            </Button>
          </Grid>
        </Grid>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {status === "loading" ? (
          <Typography>Loading...</Typography>
        )  : (
          filteredCities.map((city, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
              <Box style={cardContainerStyle}>
                <Box style={iconContainerStyle}>
                  <Link
                    to={`/superadmin/societies/${city._id}`}
                    style={{ textDecoration: "none", color: "inherit", height: "100%", width: "100%" }}
                  >
                    <img
                      src={`${ImagebaseURL}${city.image}`}
                      alt={`${city.name} Icon`}
                      style={iconImageStyle}
                    />
                  </Link>
                  <MoreVertIcon
                    onClick={(event) => handleOpenMenu(event, city._id)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                      color: "white",
                      zIndex: 10,
                    }}
                  />
                </Box>
                <Box style={textContainerStyle}>
                  <Typography variant="body1" gutterBottom style={cardTextStyle}>
                    {city.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontFamily: "Georgia, serif", fontWeight: 600, color: "#630000" }}>Add City</DialogTitle>
        {selectedImage && (
          <Box style={imagePreviewStyle}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: "50%", height: "auto", objectFit: "contain" }}
            />
          </Box>
        )}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="City Name"
            type="text"
            fullWidth
            variant="outlined"
            value={imageName}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog("cancel")} sx={{
            fontFamily: "Georgia, serif", fontWeight: 600, color: "#630000", border: "1px solid #630000", "&:hover": {
              backgroundColor: "#630000", color: "#fff", borderColor: "#630000", fontFamily: "Georgia, serif"
            }
          }}>Cancel</Button>
          <Button onClick={() => handleCloseDialog("add")} sx={{
            fontFamily: "Georgia, serif", fontWeight: 600, color: "#630000", border: "1px solid #630000", "&:hover": {
              backgroundColor: "#630000", color: "#fff", borderColor: "#630000", fontFamily: "Georgia, serif"
            }
          }}>Add</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={successDialogOpen}
        onClose={handleCloseSuccessDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontFamily: "Georgia, serif", fontWeight: 600, color: "#630000" }}>Success</DialogTitle>
        <DialogContent>
          <Typography>City added successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} sx={{
            fontFamily: "Georgia, serif", fontWeight: 600, color: "#630000", border: "1px solid #630000", "&:hover": {
              backgroundColor: "#630000", color: "#fff", borderColor: "#630000", fontFamily: "Georgia, serif"
            }
          }}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={errorDialogOpen}
        onClose={handleCloseErrorDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontFamily: "Georgia, serif", fontWeight: 600, color: "#630000" }}>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} sx={{
            fontFamily: "Georgia, serif", fontWeight: 600, color: "#630000", border: "1px solid #630000", "&:hover": {
              backgroundColor: "#630000", color: "#fff", borderColor: "#630000", fontFamily: "Georgia, serif"
            }
          }}>Close</Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            width: '200px',
          },
        }}
      >
        <MenuItem onClick={handleDeleteCity}>Delete</MenuItem>
      </Menu>
    </Box>
    </ThemeProvider>
  );
};

export default Cities;
