import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axios";

export const createDemo = createAsyncThunk(
    "demo/createDemo",
    async ({ demo }) => {
        const response = await axiosInstance.post('/demoRequest', demo);
        return response.data;
    }
);
export const getDemo = createAsyncThunk(
    "demo/getDemo",
    async () => {
        const response = await axiosInstance.get("/getDemos");
        return response.data;
    }
);
export const approveDemo = createAsyncThunk(
    "demo/approveDemo",
    async (demoId) => {
        const response = await axiosInstance.put(`/demoStatus/${demoId}`);
        return response.data;
    }
);
export const presentDemo = createAsyncThunk(
    "demo/presentDemo",
    async (demoId) => {
        const response = await axiosInstance.put(`/demoPresentedStatus/${demoId}`);
        return response.data;
    }
);
const DemoSlice = createSlice({
    name: "Demos",
    initialState: {
        Demo: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createDemo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createDemo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.Demo = action.payload;
            })
            .addCase(createDemo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(getDemo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDemo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.Demo = action.payload;
            })
            .addCase(getDemo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(approveDemo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(approveDemo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.Demo = action.payload;
            })
            .addCase(approveDemo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(presentDemo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(presentDemo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.Demo = action.payload;
            })
            .addCase(presentDemo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    },
});

export default DemoSlice.reducer;