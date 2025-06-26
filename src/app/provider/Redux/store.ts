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


export default store;