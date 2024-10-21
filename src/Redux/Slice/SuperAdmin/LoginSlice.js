import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

// Async thunk for login
export const login = createAsyncThunk(
  "/admin/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/admin/signin",
        credentials
      );
      return response.data; // Return token and user data
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error message
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("superAdmin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.superAdmin;
        const admin = JSON.stringify(state.user);
        localStorage.setItem("token", action.payload.token); 
        localStorage.setItem("superAdmin", admin); 
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
