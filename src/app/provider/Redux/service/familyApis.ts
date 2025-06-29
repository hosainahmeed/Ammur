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
        familyDirection: builder.query<any, { searchTerm: string }>({
            query: ({ searchTerm }) => ({
                url: `/users`,
                method: 'GET',
                params: {
                    proffession: searchTerm,

                }
            }),
        }),
    }),
});

export const {
    useGetFamiliesQuery,
    useFamilyDirectionQuery,
} = familyApis;
