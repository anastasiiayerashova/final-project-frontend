import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  api,
  setAuthHeader,
  clearAuthHeader,
} from '../../utils/axios.config.js';

export const registerUserOperation = createAsyncThunk(
  'user/register',
  async (cred, thunkAPI) => {
    try {
      await api.post('auth/register', cred);

      const {
        data: {
          data: { accessToken },
        },
      } = await api.post('/auth/login', cred); // после регистрации сразу логин

      setAuthHeader(accessToken); // добавляем токен в заголовок

      return { accessToken: accessToken };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.data.message); // выводим ошибку с бека
    }
  },
);

export const loginUserOperation = createAsyncThunk(
  'user/login',
  async (cred, thunkAPI) => {
    try {
      const {
        data: {
          data: { accessToken },
        },
      } = await api.post('/auth/login', cred);

      setAuthHeader(accessToken);

      return { accessToken: accessToken };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.data.message);
    }
  },
);

export const getCurrentUserDataOperation = createAsyncThunk(
  'user/data',
    async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
        
      if (!state.user.token) {
        throw new Error('No token available');
      }

      setAuthHeader(state.user.token);

      const res = await api.get('/auth/data');
      return res.data.data
        
    } catch (error) {

      if (error.response?.status === 401) {
        // пробуем обновить токен
        try {
          const { accessToken } = await thunkAPI.dispatch(refreshUserOperation()).unwrap()

          setAuthHeader(accessToken)

          // повторяем запрос с новым токеном
          const res = await api.get('/auth/data')
          return res.data.data
            
        }
        catch (refreshError) {

          console.error('Ошибка во время обновления токена:', refreshError)
            
          thunkAPI.dispatch(logoutUser()) // логаут 
            
          return thunkAPI.rejectWithValue('Session expired, you need to login')
        }
    }
        
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error during getting current data')
    }
  }
);

export const updateUserOperation = createAsyncThunk();

export const updateUserAvatarOperation = createAsyncThunk(
  'user/updateAvatar',
  async (file, thunkAPI) => {},
);

<<<<<<< HEAD
export const refreshUserOperation = createAsyncThunk();
=======
export const refreshUserOperation = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    try {
      const response = await api.post("/auth/refresh")
        
      console.log('Token refreshed', response.data)

      const accessToken = response.data?.data?.accessToken
        
      if (!accessToken) {
        throw new Error('No access token in refresh response')
      }

      setAuthHeader(accessToken);

      return { accessToken }
    }
    catch (error) {
      console.error('Ошибка при обновлении токена:', error.response?.data || error.message)

      clearAuthHeader()
        
      thunkAPI.dispatch(logoutUser()) // логаут

      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Ошибка при обновлении токена')
    }
  }
);
>>>>>>> dev

export const logoutUserOperation = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/auth/logout');
      clearAuthHeader();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  },
);

export const sendEmailOperation = createAsyncThunk(
  'user/sendEmail',
  async (cred, thunkAPI) => {
    try {
      const data = await api.post('/auth/request-reset-email', cred);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  },
);
