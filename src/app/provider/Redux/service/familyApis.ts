/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApis from "../query/baseApis";

export const familyApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getFamilies: builder.query<any, void>({
            query: () => ({
                url: '/families',
                method: 'GET',
            }),
            providesTags: ['family'],
        }),
    }),
});

export const {
    useGetFamiliesQuery,
} = familyApis;
