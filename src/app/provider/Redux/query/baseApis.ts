import { url } from '@/lib/server';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
const baseApis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        headers: {
            Authorization: `${Cookies.get('accessToken')}`,
        },
    }),
    tagTypes: ['timeline', 'timelineSingle', 'archive', 'archiveSub', 'family', 'profile', 'comment'],
    endpoints: () => ({}),
});

export default baseApis;
