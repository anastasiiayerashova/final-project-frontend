import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/axios.config.js';
import { selectToken } from '../user/selectors';

export const fetchWaterDaily = createAsyncThunk(
  'water/fetchWaterDaily',
  async (date, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state); // Отримуємо токен з Redux

      if (!token) {
        return thunkAPI.rejectWithValue('User not authenticated');
      }

      const response = await api.get(`/water/daily/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
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
