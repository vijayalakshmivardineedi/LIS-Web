// getPlansSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

const initialState = {
    plans: [],
    status: 'idle',
    error: null,
};

export const getPlans = createAsyncThunk(
    'plans/getPlans',
    async () => {
        try {
            const response = await axiosInstance.get('/getAllplans');
            return response.data.plan;
        } catch (error) {
            throw error;
        }
    }
);
export const getPlanById = createAsyncThunk(
    'plans/getPlanById',
    async (id) => {
        try {
            const response = await axiosInstance.get(`/getPlanById/${id}`);
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }
);
export const deletePlan = createAsyncThunk(
    'plans/deletePlan',
    async (id) => {
        try {
            await axiosInstance.delete(`/deletePlan/${id}`);
            return id;
        } catch (error) {
            throw error;
        }
    }
);
export const updatePlan = createAsyncThunk(
    'plans/updatePlan',
    async ({ id, plan, featureIds }) => {
        try {
            const response = await axiosInstance.put(`/updatePlan/${id}`, { plan, featureIds });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const deleteFeatureInPlan = createAsyncThunk(
    'plans/DeleteFeature',
    async ({ id, featureId }) => {
        try {
            const response = await axiosInstance.delete(`/deleteFeatureInPlan/${id}/${featureId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
const getPlansSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPlans.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error state
            })
            .addCase(getPlans.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.plans = action.payload; // Update plans state with fetched data
                state.error = null; // Reset error state
            })
            .addCase(getPlans.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture and store error message
            })

            .addCase(getPlanById.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error state
            })
            .addCase(getPlanById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.planId = action.payload;
                state.error = null; // Reset error state
            })
            .addCase(getPlanById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture and store error message
            })
            .addCase(deletePlan.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error state
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deletedPlanId = action.payload;
                state.error = null;
            })
            .addCase(deletePlan.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Capture and store error message
            })
            .addCase(updatePlan.pending, (state) => {
                state.updateStatus = 'loading';
                state.updateError = null;
            })
            .addCase(updatePlan.fulfilled, (state, action) => {
                state.updateStatus = 'succeeded';
                state.updateError = null;
            })
            .addCase(updatePlan.rejected, (state, action) => {
                state.updateStatus = 'failed';
                state.updateError = action.error.message;
            });
    },
});

export default getPlansSlice.reducer;
