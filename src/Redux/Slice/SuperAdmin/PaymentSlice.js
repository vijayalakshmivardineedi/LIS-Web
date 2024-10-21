// slices/societiesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

export const fetchPayments = createAsyncThunk(
  "Superadmin/fetchPayments",
  async () => {
    const response = await axiosInstance.get(`/getPayments`); // Adjust the URL as needed
    return response.data.getPayments; // Assuming the data returned is an array of societies
  }
);
export const updaterenewalPaymentsStatus = createAsyncThunk(
  "Superadmin/updaterenewalPaymentsStatus",
  async (id) => {
    const response = await axiosInstance.put(`/updatePayments`, { id });
    console.log("response", response)
    return response.data;
  }
);
export const deletePayment = createAsyncThunk(
  "Superadmin/DeletePayments",
  async (paymentId) => {
    console.log(paymentId)
    const response = await axiosInstance.delete(`/deletePayments`, {
      paymentId,
    }); // Adjust the URL as needed
    return response.data.getPayments; // Assuming the data returned is an array of societies
  }
);
const PaymentsSlice = createSlice({
  name: "Payments",
  initialState: {
    Payments: [],
    status: "idle",
    error: null,
    successMessage: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updaterenewalPaymentsStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updaterenewalPaymentsStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
        state.Payments = action.payload;
        state.successMessage = action.payload.message;
      })
      .addCase(updaterenewalPaymentsStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.successMessage = null
      })
  },
});

export default PaymentsSlice.reducer;