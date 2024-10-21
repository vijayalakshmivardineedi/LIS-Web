import {
    Box,
    Button,
    Chip,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TablePagination,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { approveDemo, getDemo, presentDemo } from "../../../Redux/Slice/SuperAdmin/DemoSlice";
  import { fetchCities } from "../../../Redux/Slice/SuperAdmin/citiesSlice";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#630000",
      },
    },
  });
  
  const DemoRequest = () => {
    const dispatch = useDispatch();
    const { Demo } = useSelector((state) => state.demo);
    const { cities } = useSelector((state) => state.cities);
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    useEffect(() => {
      dispatch(getDemo());
      dispatch(fetchCities());
    }, [dispatch]);
  
    const handleApprove = async (id) => {
      try {
        const result = await dispatch(approveDemo(id));
        if (result.type === "demo/approveDemo/fulfilled") {
          dispatch(getDemo());
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const getCityName = (cityId) => {
      const city = cities?.find((city) => city._id === cityId);
      return city ? city.name : "Unknown";
    };
  
    const sortedDemos = Array.isArray(Demo.demoData)
      ? [...Demo.demoData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      : [];
  
    const filteredDemos = filter === "All"
      ? sortedDemos
      : sortedDemos.filter((demo) => {
          if (filter === "Approved") {
            return demo.DemoAproval && !demo.DemoPresented;
          }
          if (filter === "Pending") {
            return !demo.DemoAproval && !demo.DemoPresented;
          }
          if (filter === "Presented") {
            return demo.DemoPresented;
          }
          return true;
        });
  
    const paginatedDemos = filteredDemos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
    const handleDemo = async (id) => {
      try {
        const result = await dispatch(presentDemo(id));
        if (result.type === "demo/presentDemo/fulfilled") {
          dispatch(getDemo());
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ margin: "2%" }}>
          <Grid container alignItems="center" justifyContent="space-between">
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
                Demo Requests
              </Typography>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel id="filter-label">Filter</InputLabel>
                <Select
                  labelId="filter-label"
                  id="filter-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Filter"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Presented">Presented</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F8E9DC" }}>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    Mobile
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    City
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    Society Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    Presented Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Arial, sans-serif" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedDemos.map((demo) => (
                  <TableRow key={demo._id}>
                    <TableCell sx={{ fontFamily: "Arial, sans-serif" }}>
                      {demo.name}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Arial, sans-serif" }}>
                      {demo.phoneNumber}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Arial, sans-serif" }}>
                      {demo.email}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Arial, sans-serif" }}>
                      {getCityName(demo.city)}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Arial, sans-serif" }}>
                      {demo.societyName}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          demo.DemoPresented
                            ? "Presented"
                            : demo.DemoAproval
                              ? "Approved"
                              : "Pending"
                        }
                        color={
                          demo.DemoPresented
                            ? "info"
                            : demo.DemoAproval
                              ? "success"
                              : "default"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(demo.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {demo.demoPresentedDate
                        ? new Date(demo.demoPresentedDate).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {!demo.DemoAproval && !demo.DemoPresented ? (
                        <Button
                          variant="contained"
                          onClick={() => handleApprove(demo._id)}
                          sx={{
                            marginRight: "5px",
                            backgroundColor: "#630000",
                            fontFamily: "Arial, sans-serif",
                            "&:hover": {
                              backgroundColor: "#630000",
                            },
                          }}
                        >
                          Approve
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => handleDemo(demo._id)}
                          disabled={demo.DemoPresented}
                          sx={{
                            marginRight: "5px",
                            fontFamily: "Arial, sans-serif",
                            "&:hover": {
                              backgroundColor: "#fff",
                            },
                          }}
                        >
                          Demo Presented
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredDemos.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 20, 30]} 
            />
          </TableContainer>
        </Box>
      </ThemeProvider>
    );
  };
  
  export default DemoRequest;
  