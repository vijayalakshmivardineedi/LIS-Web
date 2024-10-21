import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";


export const fetchCommunityHall = createAsyncThunk(
  "amenities/fetchCommunityHall",
  async (SocietyId) => {
    const response = await axiosInstance.get(
      `/getAllCommunityHall/${SocietyId}`
    );
    console.log(response.data.data, "amenities CommunityHall");
    return response.data.data;
  }
);

export const fetchPlayArea = createAsyncThunk(
  "amenities/fetchPlayArea",
  async (SocietyId) => {
    const response = await axiosInstance.get(
      `/getAllPlayAreas/${SocietyId}`
    );
    console.log(response.data, "amenities PlayArea");
    return response.data;
  }
);

export const fetchGym = createAsyncThunk(
  "amenities/fetchGym",
  async (SocietyId) => {
    const response = await axiosInstance.get(
      `/getAllGyms/${SocietyId}`
    );
    console.log(response.data, "amenities Gym");
    return response.data.data;
  }
);

export const fetchSwimmingPool = createAsyncThunk(
  "amenities/fetchSwimmingPool",
  async (SocietyId) => {
    const response = await axiosInstance.get(
      `/getAllSwimmingPool/${SocietyId}`
    );
    console.log(response.data, "amenities SwimmingPool");
    return response.data.data;
  }
);

const initialState = {
  amenities: [], // This should match with the state structure you intend to maintain
  error: null,
  status: "idle", // Adding status for loading/error handling
};

const amenitiesSlice = createSlice({
  name: "amenities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityHall.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommunityHall.fulfilled, (state, action) => {
        console.log("Payload received:", action.payload); // Log payload
        state.status = "succeeded";

        // Check if payload is an array
        if (Array.isArray(action.payload)) {
          state.amenities = [...state.amenities, ...action.payload];
        } else {
          console.error("Expected an array but received:", action.payload);
          // Optionally handle non-array payloads here
        }
      })
      .addCase(fetchCommunityHall.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPlayArea.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlayArea.fulfilled, (state, action) => {
        console.log("Payload received:", action.payload); // Log payload
        state.status = "succeeded";

        // Check if payload is an array
        if (Array.isArray(action.payload)) {
          state.amenities = [...state.amenities, ...action.payload];
        } else {
          console.error("Expected an array but received:", action.payload);
          // Optionally handle non-array payloads here
        }
      })
      .addCase(fetchPlayArea.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGym.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGym.fulfilled, (state, action) => {
        console.log("Payload received:", action.payload); // Log payload
        state.status = "succeeded";

        // Check if payload is an array
        if (Array.isArray(action.payload)) {
          state.amenities = [...state.amenities, ...action.payload];
        } else {
          console.error("Expected an array but received:", action.payload);
          // Optionally handle non-array payloads here
        }
      })
      .addCase(fetchGym.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSwimmingPool.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSwimmingPool.fulfilled, (state, action) => {
        console.log("Payload received:", action.payload); // Log payload
        state.status = "succeeded";

        // Check if payload is an array
        if (Array.isArray(action.payload)) {
          state.amenities = [...state.amenities, ...action.payload];
        } else {
          console.error("Expected an array but received:", action.payload);
          // Optionally handle non-array payloads here
        }
      })
      .addCase(fetchSwimmingPool.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default amenitiesSlice.reducer;
