import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist"
import { getCurrentUserDataOperation, loginUserOperation, logoutUserOperation, refreshUserOperation, registerUserOperation } from "./operations.js"

const initialState = {
    user: {
        name: null,
        email: null,
        gender: null,
        weight: null,
        dailySportTime: null,
        dailyWaterNorm: null,
        avatar: null
    },
    token: null,
    isLoggedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    //   logoutUser: (state) => {
    //   state.token = null;
    //   state.isLoggedIn = false;
    //   state.user = initialState.user;
    // }
    },
    extraReducers: (builder) =>
        builder
            .addCase(registerUserOperation.fulfilled, (state, { payload }) => {
                state.token = payload.accessToken
                state.isLoggedIn = true
            })
            .addCase(loginUserOperation.fulfilled, (state, { payload }) => {
                state.token = payload.accessToken
                state.isLoggedIn = true
            })
            .addCase(getCurrentUserDataOperation.fulfilled, (state, { payload }) => {
                state.user = {...state.user, ...payload}
            })
            .addCase(refreshUserOperation.fulfilled, (state, { payload }) => {
                state.token = payload.accessToken;
                state.isLoggedIn = true;
            })
            .addCase(logoutUserOperation.fulfilled, (state) => {
                state.token = null
                state.isLoggedIn = false
                state.user = initialState.user
            })
            .addCase(refreshUserOperation.rejected, (state) => { // если рефреш отклонился, логаут
                state.token = null;
                state.isLoggedIn = false;
                state.user = initialState.user;
            })       
}
)

const persistConfig = {
    key: 'user',
    version: 1,
    storage
}

export const authReducer = persistReducer(persistConfig, userSlice.reducer)
export const { resetToken, logoutUser } = userSlice.actions;