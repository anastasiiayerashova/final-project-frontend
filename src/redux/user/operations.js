import { createAsyncThunk } from "@reduxjs/toolkit"
import { api, setAuthHeader, clearAuthHeader } from "../../utils/axios.config.js"

export const registerUserOperation = createAsyncThunk(
    'user/register',
    async (cred, thunkAPI) => {
        try {
            await api.post('auth/register', cred)

            const { data: { data: { accessToken } } } = await api.post('/auth/login', cred) // после регистрации сразу логин

            setAuthHeader(accessToken) // добавляем токен в заголовок
            
            return {accessToken: accessToken}
            
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message) // выводим ошибку с бека
        }
    }
)

export const loginUserOperation = createAsyncThunk(
    'user/login',
    async (cred, thunkAPI) => {
        try {
            const { data: { data: { accessToken } } } = await api.post('/auth/login', cred)

            setAuthHeader(accessToken)

            return {accessToken: accessToken}
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const getCurrentUserDataOperation = createAsyncThunk()

export const updateUserOperation = createAsyncThunk()

export const updateUserAvatarOperation = createAsyncThunk(
    'user/updateAvatar',
    async (file, thunkAPI) => {}
)

export const refreshUserOperation = createAsyncThunk()

export const logoutUserOperation = createAsyncThunk()