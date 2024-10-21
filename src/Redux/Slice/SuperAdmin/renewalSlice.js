import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

export const renewSocietyPlan = createAsyncThunk(
  'renewal/renewPlan',
  async (renewalData, thunkAPI) => {
    console.log(renewalData)
    try {
      const response = await axiosInstance.put('/society/renewal', renewalData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const renewalSlice = createSlice({
  name: 'renewal',
  initialState: {
    renewalStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(renewSocietyPlan.pending, (state) => {
        state.renewalStatus = 'loading';
      })
      .addCase(renewSocietyPlan.fulfilled, (state) => {
        state.renewalStatus = 'succeeded';
      })
      .addCase(renewSocietyPlan.rejected, (state, action) => {
        state.renewalStatus = 'failed';
        state.error = action.error.message;
        // state.error = action.payload;
      });
  },
});

export const RenewalPlanReducer = renewalSlice.reducer;