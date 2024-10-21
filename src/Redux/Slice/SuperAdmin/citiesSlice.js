// Import the necessary functions
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

// Fetch cities
export const fetchCities = createAsyncThunk("cities/fetchCities", async () => {
  const response = await axiosInstance.get("/getAllCities");
  return response.data.cities;
});

// Create a city
export const createCity = createAsyncThunk(
  "cities/createCity",
  async ({ name, file }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    const response = await axiosInstance.post("/createCity", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.city;
  }
);

// Delete a city
export const deleteCity = createAsyncThunk(
  "cities/deleteCity",
  async (cityId) => {
    const response = await axiosInstance.delete(`/deleteCity/${cityId}`);
    return response.data.city;
  }
);

const citySlice = createSlice({
  name: "cities",
  initialState: {
    cities: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities.push(action.payload); 
      })
      .addCase(createCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = state.cities.filter((city) => city._id !== action.payload._id);
      })
      .addCase(deleteCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const cityReducer = citySlice.reducer;