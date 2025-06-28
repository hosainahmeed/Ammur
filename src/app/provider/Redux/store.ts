import { configureStore } from "@reduxjs/toolkit";
import baseApis from "./query/baseApis";
import authSlice from './slices/authSlice'
const store = configureStore({
    reducer: {
        [baseApis.reducerPath]: baseApis.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApis.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;