import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axios";

// Async thunk to fetch features
export const fetchFeatures = createAsyncThunk('features/fetchFeatures', async () => {
  const response = await axiosInstance.get('/getFeatures');
  console.log(response.data);
  return response.data;
});

// Async thunk to fetch a feature by ID /getFeaturesById/:id
export const fetchFeatureById = createAsyncThunk('features/fetchFeatureById', async (id) => {
    console.log(id)
    const response = await axiosInstance.get(`/getFeatureById/${id}`);
    return response.data;
  });

// Async thunk to create a new feature
export const createFeature = createAsyncThunk('features/createFeature', async (featureData) => {
    const response = await axiosInstance.post('/createFeature', featureData);
    console.log(response.data);
    return response.data;
  });

  // Async thunk to update a feature
export const updateFeatureById = createAsyncThunk('features/updateFeaturesById', async ({ id, featureData }) => {
    const response = await axiosInstance.put(`/updateFeaturesById/${id}`, featureData);
    return response.data;
  });
    
  export const deleteFeatureById = createAsyncThunk('features/deleteFeatureById', async (id) => {
    const response = await axiosInstance.delete(`/deleteFeaturesById/${id}`);
    return response;
  });

const featuresSlice = createSlice({
  name: 'features',
  initialState: {
    features: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.features = action.payload;
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(createFeature.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createFeature.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createFeature.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFeatureById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeatureById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.features = action.payload;
      })
      .addCase(fetchFeatureById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateFeatureById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateFeatureById.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateFeatureById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteFeatureById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFeatureById.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(deleteFeatureById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // .addCase(deleteFeatureById.fulfilled, (state, action) => {
      //   state.features = state.features.filter((feature) => feature._id !== action.payload);
      // });
  },
});

export default featuresSlice.reducer;