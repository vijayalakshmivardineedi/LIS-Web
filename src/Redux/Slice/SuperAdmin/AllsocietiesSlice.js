// src/slices/societySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";


// Define async thunks
export const fetchSocieties = createAsyncThunk(
  'renewal/fetchSocieties',
  async () => {
    const response = await axiosInstance.get('/society');
    return response.data.societies;
  }
);

export const renewSocietyPlan = createAsyncThunk(
  'renewal/renewSocietyPlan',
  async (planDetails) => {
    const response = await axiosInstance.post('/society/renewal', planDetails);
    return response.data;
  }
);

// Create slice
const allSocietiesSlice = createSlice({
  name: 'renewal',
  initialState: {
    societies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocieties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSocieties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.societies = action.payload;
      })
      .addCase(fetchSocieties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(renewSocietyPlan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(renewSocietyPlan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle successful renewal here
      })
      .addCase(renewSocietyPlan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default allSocietiesSlice.reducer;
