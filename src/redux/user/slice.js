import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist"
import { registerUserOperation } from "./operations.js"

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
    isLoggedId: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
    .addCase(registerUserOperation.fulfilled, (state, { payload }) => {
                state.token = payload.accessToken
                state.isLoggedId = true
    })
}
)

const persistConfig = {
    key: 'user',
    version: 1,
    storage
}

export const authReducer = persistReducer(persistConfig, userSlice.reducer)