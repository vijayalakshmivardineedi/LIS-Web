// slices/societiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axiosInstance.get(`/user/getAllUserProfiles`); // Adjust the URL as needed

  return response.data.userProfile; // Assuming the data returned is an array of societies
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    societies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        console.log(state.user)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;