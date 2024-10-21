// src/Redux/Slice/userProfilesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

export const fetchUserProfilesBySocietyId = createAsyncThunk(
  'userProfiles/fetchBySocietyId',
  async (societyId) => {
    const response = await axiosInstance.get(`/user/getAllUserProfilesBySocietyId/${societyId}`);
   console.log(response.data)
    return response.data.userProfiles;
  }
);
// http://172.30.160.1:2000

const userProfilesSlice = createSlice({
  name: 'userProfiles',
  initialState: {
    profiles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfilesBySocietyId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfilesBySocietyId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchUserProfilesBySocietyId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userProfilesSlice.reducer;
