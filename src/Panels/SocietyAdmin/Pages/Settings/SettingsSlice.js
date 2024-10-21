import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../helpers/axios';

// Define the initial state
const initialState = {
    loading: false,
    success: false,
    error: null,
    successMessage: null,
};

// Define the async thunk for resetting the password
export const resetPassword = createAsyncThunk(
    'resetPassword/reset',
    async ({ currentPassword, password, societyId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/society/resetPassword', {
                currentPassword,
                password,
                societyId,
            });
            return response.data;
        } catch (error) {console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Create the slice
const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.successMessage = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
                state.successMessage = null;
            });
    },
});

export const { resetState } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;


