// slices/societiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

export const fetchSocieties = createAsyncThunk('societies/fetchSocieties', async (cityId) => {
  const response = await axiosInstance.get(`/society/${cityId}`); // Adjust the URL as needed
  return response.data; // Assuming the data returned is an array of societies
});

const societiesSlice = createSlice({
  name: 'societies',
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
      });
  },
});

export default societiesSlice.reducer;