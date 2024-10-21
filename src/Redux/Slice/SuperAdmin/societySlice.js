import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

// Define the initial state
const initialState = {
  loading: false,
  societyAdmin: null,
  error: null,
};

// Define the async thunk for society signup
export const societySignup = createAsyncThunk(
  'society/signup',
  async (formData, thunkAPI) => {
    console.log(formData)
    try {
      const response = await axiosInstance.post('/society/signup', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const societySlice = createSlice({
  name: 'society',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(societySignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(societySignup.fulfilled, (state, action) => {
        state.loading = false;
        state.societyAdmin = action.payload;
        state.error = null;
      })
      .addCase(societySignup.rejected, (state, action) => {
        state.loading = false;
        state.societyAdmin = null;
        state.error = action.payload.message || 'An error occurred';
      });
  },
});

export default societySlice.reducer;