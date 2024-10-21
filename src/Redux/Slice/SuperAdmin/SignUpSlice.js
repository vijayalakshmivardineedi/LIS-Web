

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

export const signupSuperAdmin = createAsyncThunk(
  "/superadmin/signup",
  async ({ firstName, secondName, email, password }, { rejectWithValue }) => {
    console.log(firstName, secondName, email, password);

    try {
      const response = await axiosInstance.post(
        "/admin/signup",
        { firstName, secondName, email, password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupSuperAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupSuperAdmin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(signupSuperAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default superAdminSlice.reducer;
