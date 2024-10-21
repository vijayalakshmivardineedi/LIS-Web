import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeatures,
  deleteFeatureById,
} from "../../../../Redux/Slice/SuperAdmin/FeaturesSlice";

const Features = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [list, setList] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Features } = useSelector((state) => state.features.features);
  const featureStatus = useSelector((state) => state.features.status);
  const error = useSelector((state) => state.features.error);

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);
  console.log(Features);
  const handleMenuClick = (event, feature) => {
    setSelectedFeature(feature);
    setAnchorEl(event.currentTarget);
    setList(feature._id)
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      await dispatch(deleteFeatureById(selectedFeature._id)).then(
        (response) => {
          if (response.type === "features/deleteFeatureById/fulfilled") {
            dispatch(fetchFeatures());
          }
        }
      );
    }
    handleMenuClose();
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedFeature) {
      await dispatch(deleteFeatureById(selectedFeature._id)).then(
        (response) => {
          if (response.type === "features/deleteFeatureById/fulfilled") {
            dispatch(fetchFeatures());
          }
        }
      );
    }
    handleDialogClose();
    handleMenuClose();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setList(null);
  };
  let content;
  if (featureStatus === "loading") {
    content = <Typography>Loading...</Typography>;
  } else if (featureStatus === "succeeded") {
    content = (
      <TableBody>
        {Features.map((feature) => (
          <TableRow key={feature._id}>
            <TableCell
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 15,
                flex: 1,
              }}
            >
              {feature._id}
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 15,
                flex: 1,
              }}
            >
              {feature.feature}
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: 15,
                flex: 1,
              }}
            >
              --
            </TableCell>
            <TableCell sx={{ flex: 0.5 }}>
              <IconButton
                sx={{ fontSize: 18, color: "#000" }}
                onClick={(event) => handleMenuClick(event, feature)}
              >
                <SlOptionsVertical />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && list === feature._id}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() =>
                    navigate(`/superadmin/editFeatures/${selectedFeature?._id}`)
                  }
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={handleDialogOpen}
                  style={{ color: "#ff0000" }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  } else if (featureStatus === "failed") {
    content = <Typography>{error}</Typography>;
  }

  return (
    <Box sx={{ margin: "5px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: "28px",
            fontWeight: "700",
            color: "#630000",
          }}
        >
          Features
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
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
            onClick={() => navigate("/superadmin/addFeatures")}
          >
            ADD
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "Red Hat Display,sans-serif,sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  flex: 1,
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Red Hat Display,sans-serif,sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  flex: 1,
                }}
              >
                Feature Name
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Red Hat Display,sans-serif,sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  flex: 1,
                }}
              >
                Feature Price
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Red Hat Display,sans-serif,sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {content}
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this feature?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{
              color: "#630000",
              border: "2px solid #630000",
              fontWeight: "600",
              fontFamily: "Montserrat, sans-serif",
              "&:hover": {
                backgroundColor: "#630000",
                color: "#fff",
                borderColor: "#630000",
                fontFamily: "Georgia, serif",
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              color: "#630000",
              border: "2px solid #630000",
              fontWeight: "600",
              fontFamily: "Montserrat, sans-serif",
              "&:hover": {
                backgroundColor: "#630000",
                color: "#fff",
                borderColor: "#630000",
                fontFamily: "Georgia, serif",
              },
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Features;