import { url } from '@/lib/server';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseApis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        headers: {},
    }),
    tagTypes: [],
    endpoints: () => ({}),
});

export default baseApis;
