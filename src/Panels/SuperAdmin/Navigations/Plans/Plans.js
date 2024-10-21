import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlan,
  getPlans,
} from "../../../../Redux/Slice/SuperAdmin/getPlansSlice";
import { useNavigate } from "react-router-dom";
import { fetchFeatures } from "../../../../Redux/Slice/SuperAdmin/FeaturesSlice";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  margin: "10px",
  padding: "10px",
});
const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});
const CardsContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
});
const StyledCard = styled(Card)({
  background: "#F8E9DC",
  color: "black",
  width: "30%",
  transition: "0.3s",
  transform: "translateY(0)",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 40px rgba(0, 0, 0, 0.19)",
    transform: "translateY(-5px)",
  },
  borderRadius: "15px",
  textAlign: "center",
  position: "relative",
});
const AddButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  width: "100%",
});
const Plans = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuCardId, setMenuCardId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plan);
  useEffect(() => {
    dispatch(getPlans());
    dispatch(fetchFeatures());
  }, [dispatch]);
  const handleMenuOpen = (event, cardId) => {
    setAnchorEl(event.currentTarget);
    setMenuCardId(cardId);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCardId(null);
  };
  const handleEdit = (planId) => {
    navigate(`/superadmin/editPlans/${planId}`);
  };
  const handleDelete = (cardId) => {
    setCardToDelete(cardId);
    setOpenDialog(true);
  };
  const handleDeleteConfirm = async () => {
    if (cardToDelete) {
      await dispatch(deletePlan(cardToDelete)).then((response) => {
        if (response.type === "plans/deletePlan/fulfilled") {
          dispatch(getPlans());
        }
      });
    }
    setOpenDialog(false);
    handleMenuClose();
  };
  const handleDeleteCancel = () => {
    setOpenDialog(false);
    setCardToDelete(null);
    handleMenuClose();
  };
  const { Features } = useSelector((state) => state.features.features);
  const loading = useSelector((state) => state.plan.loading);
  const getFeatureName = (featureId) => {
    const feature = Features?.find((feature) => feature._id === featureId);
    return feature ? feature.feature : "Unknown";
  };
  const handleAdd = () => {
    navigate("/superadmin/addPlans");
  };
  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#630000",
            fontFamily: "Georgia, serif",
          }}
        >
          Plans
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
            onClick={handleAdd}
          >
            ADD
          </Button>
        </Box>
      </Box>
      <CardsContainer>
        {plans.plans.map((plan, index) => (
          <React.Fragment key={plan._id}>
            <StyledCard>
              <IconButton
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "black",
                }}
                onClick={(e) => handleMenuOpen(e, plan._id)}
              >
                <MoreVertIcon />
              </IconButton>
              <CardContent>
                <Typography
                  variant="h5"
                  component="body1"
                  style={{
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    fontFamily: "Georgia, serif",

                  }}
                >
                  {plan.plan}
                </Typography>
                {plan.features.map((feature) => (
                  <Typography
                    key={feature._id}
                    variant="body1"
                    component="div"
                    style={{
                      margin: "10px",
                      fontWeight: "600",
                      textAlign: "left",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {getFeatureName(feature.featureId)}
                  </Typography>
                ))}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && menuCardId === plan._id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleEdit(plan._id)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDelete(plan._id)} style={{ color: "#ff0000" }}>
                    Delete
                  </MenuItem>
                </Menu>
              </CardContent>
            </StyledCard>
          </React.Fragment>
        ))}
        <AddButtonContainer></AddButtonContainer>
      </CardsContainer>
      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "600",
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Are you sure you want to delete this plan?
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button
            onClick={handleDeleteConfirm}
            color="primary"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              color: "#630000",
              border: "2px solid #630000",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#630000",
                color: "#fff",
                borderColor: "#630000",
              },
            }}
            autoFocus
          >
            Yes
          </Button>
          <Button
            onClick={handleDeleteCancel}
            sx={{
              fontFamily: "Montserrat, sans-serif",
              color: "#630000",
              border: "2px solid #630000",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#630000",
                color: "#fff",
                borderColor: "#630000",
              },
            }}
          >
            No
          </Button>
          
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default Plans;