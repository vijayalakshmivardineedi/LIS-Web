import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TableContainer,
  TableHead,
  TableCell,
  Table,
  Divider,
  TableRow,
  TableBody,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { RiCommunityFill } from "react-icons/ri";
import { GiModernCity } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { MdAutorenew } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../../Redux/Slice/SuperAdmin/citiesSlice";
import { fetchSocieties } from "../../../Redux/Slice/SuperAdmin/AllsocietiesSlice";
import BarChart1 from "./Pannels/BarChart1";
import PieCharts from "./Pannels/PieCharts";
import LineCharts from "./Pannels/LineCharts";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { fetchUsers } from "../../../Redux/Slice/SuperAdmin/userSlice";
import { fetchPayments } from "../../../Redux/Slice/SuperAdmin/PaymentSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from "@mui/material/styles";
const uData = [400, 300, 200, 278, 189, 239, 349, 300, 200, 278, 189, 239];
const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.cities);
  const { societies } = useSelector((state) => state.allsocieties);
  const { user } = useSelector((state) => state.user);
  const { Payments } = useSelector((state) => state.Payments);
  const [selectedCity, setSelectedCity] = useState("");
  const [uData, setUData] = useState([]);
  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchUsers());
    dispatch(fetchSocieties());
    dispatch(fetchPayments());
  }, [dispatch]);
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const getCityName = (cityId) => {
    const city = cities.find((city) => city._id === cityId);
    return city ? city.name : "Unknown";
  };
  const citiesCount = cities ? cities.length : 0;
  const societiesCount = societies ? societies.length : 0;
  const usersCount = user ? user.length : 0;
  const renewalCount = Payments?.filter((payment) => payment.isRenewal) || [];
  const filteredSocieties = selectedCity
    ? societies.filter((society) => society.city === selectedCity)
    : societies;

  useEffect(() => {
    const registrationCounts = new Array(12).fill(0);
    user?.forEach((user) => {
      const date = new Date(user.updatedAt);
      const month = date.getMonth();
      registrationCounts[month]++;
    });
    // Format data for LineChart
    const chartData = xLabels.map((label, index) => registrationCounts[index]);
    setUData(chartData);
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ padding: 2, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(to left,#fdd812, #a36905)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: "#fff",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Cities
              </Typography>
              <Box
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  {citiesCount}
                </Typography>
                <GiModernCity size={45} color="#fff" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(to left,#ff9696, #ae0606)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: "#fff",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Communities
              </Typography>
              <Box
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  {societiesCount}
                </Typography>
                <RiCommunityFill size={45} color="#fff" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(to left,#7afbbf, #0d6e42)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: "#fff",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Users
              </Typography>
              <Box
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  {usersCount}
                </Typography>
                <FaUsers size={45} color="#fff" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(to left,#8ed4ff,#1466e1)",
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: "#fff",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Renewals
              </Typography>
              <Box
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#fff" }}
                >
                  {renewalCount.length}
                </Typography>
                <MdAutorenew size={45} color="#fff" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <Box
            sx={{
              background: "#fff0f0",
              borderRadius: 2,
              padding: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 600,
                color: "#630000",
                marginBottom: 1,
                fontFamily: "Montserrat, sans-serif",
                textAlign: "start",
              }}
            >
              Income Statistics
            </Typography>
            <LineCharts />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Box
            sx={{
              background: "#d4f6f9",
              borderRadius: 2,
              padding: 1,
              height: "95%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 600,
                color: "#19478f",
                marginBottom: 1,
                fontFamily: "Montserrat, sans-serif",
                textAlign: "start",
              }}
            >
              Selected Plans
            </Typography>
            <PieCharts />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            sx={{
              background: "#ebfde8",
              borderRadius: 2,
              padding: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 600,
                color: "#175018",
                marginBottom: 2,
                fontFamily: "Montserrat, sans-serif",
                textAlign: "start",
              }}
            >
              Overall Analytics
            </Typography>
            <BarChart1 />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
  <Box
    sx={{
      backgroundColor: "#fffbe0",
      borderRadius: 2,
      padding: 2,
      display: "flex",
      flexDirection: "column",
      height: "340px",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          color: "#d38500",
          fontWeight: 600,
          marginBottom: 1,
          fontFamily: "Montserrat, sans-serif",
          textAlign: "start",
        }}
      >
        Societies / Cities
      </Typography>
      <Select
        value={selectedCity}
        onChange={handleCityChange}
        displayEmpty
        sx={{ marginBottom: 2, width: "50%", height: 35 }}
      >
        <MenuItem value="">Select City</MenuItem>
        {cities.map((city) => (
          <MenuItem key={city._id} value={city._id}>
            {city.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              City
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Community Name
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Plan Type
            </TableCell>
            <TableCell
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSocieties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            filteredSocieties.map((cityPlan, index) => (
              <TableRow key={index}>
                <TableCell>{getCityName(cityPlan.city)}</TableCell>
                <TableCell>{cityPlan.societyName}</TableCell>
                <TableCell>{cityPlan.memberShip}</TableCell>
                <TableCell>
                  {cityPlan.activeStatus === true ? "True" : "False"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
</Grid>


        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              backgroundColor: "#ffe3fc",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "90%",
              padding: 2,
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "#a80097",
                fontWeight: 600,
                marginBottom: 1,
                fontFamily: "Montserrat, sans-serif",
                textAlign: "start",
              }}
            >
              User Registrations
            </Typography>
            <LineChart
              width={500}
              height={300}
              series={[
                { data: uData, label: "User", area: true, showMark: false },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              yAxis={[{ data: uData, scaleType: "linear" }]}
              sx={{
                [`& .${lineElementClasses.root}`]: {
                  display: "none",
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
  );
};
export default Dashboard;