import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { deletePayment, fetchPayments, updaterenewalPaymentsStatus } from "../../../Redux/Slice/SuperAdmin/PaymentSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      main: "#630000",
    },
  },
});
const Payments = () => {
  const [invoices, setInvoices] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("All");
  const { Payments, status, error } = useSelector((state) => state.Payments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  useEffect(() => {
    setInvoices(Payments);
  }, [Payments]);
  const handleApprove = async (id) => {
    console.log(id)
    try {
      const result = await dispatch(updaterenewalPaymentsStatus(id));
      if (result.type === "Superadmin/updaterenewalPaymentsStatus/fulfilled") {
        dispatch(fetchPayments());
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const confirmDelete = () => {
    dispatch(deletePayment(selectedPayment)).then((response) => {
      if (response.type === "Superadmin/DeletePayments/fulfilled") {
        dispatch(fetchPayments());
        setDeleteConfirmOpen(false);
      }
    });
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
  };

  const generatePDF = (invoice) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    // Invoice Details
    doc.setFontSize(14);
    doc.text(`Invoice ID: ${invoice.transactionId}`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 40);

    // Customer Details
    doc.setFontSize(12);
    doc.text("Bill To:", 14, 60);
    doc.text(`Society Name: ${invoice.societyName}`, 14, 70);
    doc.text(`Society ID: ${invoice.societyId}`, 14, 80);

    // Table
    doc.autoTable({
      startY: 100,
      head: [['Description', 'Amount']],
      body: [
        ['Membership', invoice.memberShip],
        ['Price', `${invoice.price}`],
        ['Payment Date', new Date(invoice.paymentDate).toLocaleDateString()],
        ['Payment Method', invoice.paymentMethod],
        ['Payment Status', invoice.paymentStatus],
        ['Start Date', new Date(invoice.startDate).toLocaleDateString()],
        ['Expiry Date', new Date(invoice.expiryDate).toLocaleDateString()]
      ],
      theme: 'striped',
      headStyles: {
        fillColor: [100, 100, 100],
        halign: 'right' // Align header text to the right
      },
      margin: { top: 20 },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { halign: 'left' }, // Align 'Description' column to the left
        1: { halign: 'right' } // Align 'Amount' column to the right
      }
    });

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your payment!", 14, doc.internal.pageSize.height - 30);

    // Save the PDF
    doc.save(`invoice_${invoice.transactionId}.pdf`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Sort invoices by paymentDate in descending order
  const sortedInvoices = [...invoices].sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));

  const filteredInvoices = filter === "All"
    ? sortedInvoices
    : sortedInvoices.filter(invoice => invoice.paymentStatus === filter);

  const paginatedInvoices = filteredInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ margin: "2%" }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Georgia, serif",
                fontWeight: "700",
                color: "#630000",
              }}
            >
              Payments
            </Typography>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Filter Payments</InputLabel>
              <Select
                value={filter}
                onChange={handleFilterChange}
                label="Filter Payments"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "16px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F8E9DC" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Transaction ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Society Name / Society ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Membership</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Payment Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Expiry Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedInvoices.map((invoice) => (
                  <TableRow key={invoice.transactionId}>
                    <TableCell>{invoice.transactionId}</TableCell>
                    <TableCell>{invoice.societyName} <br /> {invoice.societyId}</TableCell>
                    <TableCell>{invoice.memberShip}</TableCell>
                    <TableCell ><BiRupee /> {invoice.price}</TableCell>
                    <TableCell>{new Date(invoice.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          color:
                            invoice.paymentStatus === "Completed"
                              ? "green"
                              : invoice.paymentStatus === "Pending"
                                ? "orange"
                                : "blue",
                        }}
                      >
                        {invoice.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(invoice.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(invoice.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1} alignItems="center">
                        {invoice.paymentStatus === "Pending" ?
                          <Button
                            onClick={() => handleApprove(invoice._id)}
                            variant="outlined"
                            sx={{ color: "#630000", justifyContent: "space-between" }}
                          >
                            <DoneAllIcon sx={{ fontSize: "20px", marginRight: 1 }} /> Approved
                          </Button> :
                          <Button
                            onClick={() => generatePDF(invoice)}
                            sx={{ color: "#630000", justifyContent: "space-between" }}
                          >
                            <DownloadIcon sx={{ fontSize: "20px", marginRight: 1 }} /> Download
                          </Button>
                        }
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredInvoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ marginTop: "16px" }}
          />
          <Dialog
            open={deleteConfirmOpen}
            onClose={cancelDelete}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this invoice?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelDelete} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Payments;
