import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for password reset
export const resetPassword = createAsyncThunk(
  "passwordReset/resetPassword",
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://livinsync.onrender.com/api/admin/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reset password";
        state.success = false;
      });
  },
});

export const { resetState } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;
