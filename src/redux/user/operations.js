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
            return thunkAPI.rejectWithValue(e.response.data.data.message) // выводим ошибку с бека
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
            return thunkAPI.rejectWithValue(e.response.data.data.message)
        }
    }
)

export const getCurrentUserDataOperation = createAsyncThunk(
    'user/data', 
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState()

            setAuthHeader(state.user.token)

            const res = await api.get('/auth/data')

            return res.data.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const updateUserOperation = createAsyncThunk()

export const updateUserAvatarOperation = createAsyncThunk(
    'user/updateAvatar',
    async (file, thunkAPI) => {}
)

export const refreshUserOperation = createAsyncThunk()

export const logoutUserOperation = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            await api.post('/auth/logout')
            clearAuthHeader()
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const sendEmailOperation = createAsyncThunk(
    'user/sendEmail',
    async (cred, thunkAPI) => {
        try {
            const data = await api.post('/auth/request-reset-email', cred)

            return data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)