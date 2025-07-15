import baseApis from "../query/baseApis";


const contactUsApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        //email operations
        getAllEmail: builder.query({
            query: () => ({
                url: '/emails',
                method: 'GET',
            }),
            providesTags: ['email'],
        }),
        //phone operations
        getAllPhone: builder.query({
            query: () => ({
                url: '/phones',
                method: 'GET',
            }),
            providesTags: ['phone'],
        }),

        //social media
        socialMedia: builder.query({
            query: () => ({
                url: '/social-medias',
                method: 'GET',
            }),
            providesTags: ['social'],
        }),

    }),
});

export const {
    useGetAllEmailQuery,
    useGetAllPhoneQuery,
    //social media
    useSocialMediaQuery,
} = contactUsApis;
