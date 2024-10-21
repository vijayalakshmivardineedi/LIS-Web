import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

// Async thunk to verify OTP
export const verifyOtp = createAsyncThunk(
  "otp/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/admin/verifyCode",
        {
          email,
          code: otp,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in verifyOtp:", error); // Log error details
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    email: "",
    otp: Array(6).fill(""),
    status: "idle",
    error: null,
    verified: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    resetOtpState: (state) => {
      state.email = "";
      state.otp = Array(6).fill("");
      state.status = "idle";
      state.error = null;
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear any previous errors
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.verified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message || "Failed to verify OTP";
      });
  },
});

export const { setEmail, setOtp, resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
