// src/slices/societySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

// Define initial state
const initialState = {
    society: null,
    status: 'idle',
    error: null
};

// Create an async thunk for fetching society data
export const fetchSocietyById = createAsyncThunk(
    'society/fetchSocietyById',
    async (societyId) => {
        console.log(societyId)
        const response = await axiosInstance.get(`/societyDetails/${societyId}`);
        console.log(response.data.society,"society details")
        return response.data.society;

    }
);

// Create the slice
const societySlice = createSlice({
    name: 'society',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSocietyById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSocietyById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.society = action.payload;
            })
            .addCase(fetchSocietyById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default societySlice.reducer;
