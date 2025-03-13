import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./user/slice.js"
import { waterReducer } from './water/slice.js';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'

export const store = configureStore({
    reducer: {
      user: authReducer,
      water: waterReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)