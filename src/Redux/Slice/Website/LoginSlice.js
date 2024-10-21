import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  user: null,
  successMessage: null,
  token: localStorage.getItem("token") || null,
};
export const login = createAsyncThunk(
  "societyAdmin/login",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        "https://livinsync.onrender.com/api/society/signin",
        { email, password }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
);

const societyAdminSlice = createSlice({
  name: "societyAdmin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.societyAdmin = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("societytoken");
      localStorage.removeItem("societyAdmin");
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("action.payload", action.payload); // Log the entire payload
        state.status = "succeeded";
        state.societyAdmin = action.payload.societyAdmin;
        state.token = action.payload.token;
        const societyAdmin = JSON.stringify(state.societyAdmin);
        localStorage.setItem("societytoken", action.payload.token);
        localStorage.setItem("societyAdmin", societyAdmin);
        state.successMessage = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.successMessage = null;
      });
  },
});
export const { setUser, setToken,logout } = societyAdminSlice.actions;

export default societyAdminSlice.reducer;
