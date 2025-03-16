import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.config.js';

export const fetchWaterDaily = createAsyncThunk(
  'water/fetchWaterDaily',
  async (date, thunkAPI) => {
    try {
      const response = await api.get(`/water/daily/${date}`);
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return []; // Якщо `404`, то це нормально: записуємо пустий масив у store
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (waterId, thunkAPI) => {
    try {
      const response = await api.delete(`/water/${waterId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editWater = createAsyncThunk(
  'water/editWater',
  async ({ waterId, newData }, thunkAPI) => {
    try {
      const response = await api.put(`/water/${waterId}`, newData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchWaterMonthly = createAsyncThunk(
  'water/fetchWaterMonthly',
  async (month, thunkAPI) => {
    try {
      const response = await api.get(`/water/monthly/${month}`);
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return []; // Якщо `404`, то це нормально: записуємо пустий масив у store
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
