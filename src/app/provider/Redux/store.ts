import { configureStore } from "@reduxjs/toolkit";
import baseApis from "./query/baseApis";


const store = configureStore({
    reducer: {
        [baseApis.reducerPath]: baseApis.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApis.middleware),
});


export default store;