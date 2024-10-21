// src/redux/slice/Plans/plansSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

// Define initial state
const initialState = {
  plans: [],
  status: 'idle', // or 'loading', 'succeeded', 'failed'
  error: null,
};

// Define async thunk for creating a plan
export const createPlan = createAsyncThunk(
  'plans/createPlan',
  async (newPlan, { rejectWithValue }) => {
    console.log(newPlan)
    try {
      const response = await axiosInstance.post('/createPlan', newPlan); // Replace with your API endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plans.push(action.payload);
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default plansSlice.reducer;
