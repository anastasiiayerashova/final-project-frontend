import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.config.js';
import { selectToken } from '../user/selectors';

export const fetchWaterDaily = createAsyncThunk(
  'water/fetchWaterDaily',
  async (date, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      const response = await api.get(`/water/daily/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const state = thunkAPI.getState();
      const token = selectToken(state); // Отримуємо токен з Redux

      if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      // Додаємо заголовок авторизації
      const response = await api.post('/water', water, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      const response = await api.delete(`/water/${waterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      const response = await api.put(`/water/${waterId}`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchWaterMonth = createAsyncThunk(
  'water/fetchWaterMonth',
  async (month, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      const response = await api.get(`/water/monthly/${month}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
