import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocieties } from "../../../Redux/Slice/SuperAdmin/AllsocietiesSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Renewal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { societies, status } = useSelector((state) => state.allsocieties);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSocieties());
    }
  }, [status, dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Customize date format if needed
  };

   const today = new Date();
   const fiveDaysFromNow = new Date();
   fiveDaysFromNow.setDate(today.getDate() + 5);

     // Function to check if a date is within the next 5 days
  const isExpiringSoon = (expiryDate) => {
    const date = new Date(expiryDate);
    return date >= today && date <= fiveDaysFromNow;
  };

  const filteredSocieties = societies.filter((society) => {
    const expiryDate = new Date(society.expiryDate);
    console.log(expiryDate <= fiveDaysFromNow)
    return  expiryDate <= fiveDaysFromNow;
  });

  return (
    <Grid sx={{ margin: "2%" }}>
      <Grid item>
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
      </Grid>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F8E9DC" }}>
              <TableCell sx={{fontWeight: 700, fontFamily: "Arial, sans-serif"}} >Society ID</TableCell>
              <TableCell sx={{fontWeight: 700, fontFamily: "Arial, sans-serif"}}>Society Name</TableCell>
              <TableCell sx={{fontWeight: 700, fontFamily: "Arial, sans-serif"}}>Membership</TableCell>
              <TableCell sx={{fontWeight: 700, fontFamily: "Arial, sans-serif"}}>License ID</TableCell>
              <TableCell sx={{fontWeight: 700, fontFamily: "Arial, sans-serif"}}>Start Date</TableCell>
              <TableCell sx={{fontWeight: 700, fontFamily: "Arial, sans-serif"}}>End Date</TableCell>
              <TableCell sx={{fontWeight: 700, fontFamily: "Arial, sans-serif"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSocieties.length > 0 ? (
              filteredSocieties.map((society) => (
                <TableRow key={society._id}>
                  <TableCell>{society._id}</TableCell>
                  <TableCell>{society.societyName}</TableCell>
                  <TableCell>{society.memberShip}</TableCell>
                  <TableCell>{society.licenseId || society.license}</TableCell>
                  <TableCell>{formatDate(society.startDate)}</TableCell>
                  <TableCell>{formatDate(society.expiryDate)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/superadmin/renewal/${society._id}`)}
                      sx={{
                        backgroundColor: "#630000",
                        "&:hover": {
                          backgroundColor: "#630000",
                        },
                        
                      }}
                      disabled={isExpiringSoon(society.expiryDate)}
                    >
                      Renewal Plan
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No renewals due today
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Renewal;