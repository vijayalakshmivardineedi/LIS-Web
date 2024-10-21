// src/Redux/Slice/visitorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

export const fetchVisitorsBySocietyId = createAsyncThunk(
  'visitors/fetchBySocietyId',
  async (societyId) => {
    const response = await axiosInstance.get(`/visitors/getAllVisitorsBySocietyId/${societyId}`);
    return response.data.visitors;
  }
);

const visitorsSlice = createSlice({
  name: 'visitors',
  initialState: {
    visitors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitorsBySocietyId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVisitorsBySocietyId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.visitors = action.payload;
      })
      .addCase(fetchVisitorsBySocietyId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default visitorsSlice.reducer;
