import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.config.js';

export const addWater = createAsyncThunk(
  'water/addWater',
  async (water, thunkAPI) => {
    try {
      const response = await api.post('/water', water);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
