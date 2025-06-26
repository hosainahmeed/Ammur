import baseApis from "../query/baseApis";

const familyApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createFamily: builder.mutation({
            query: (data) => ({
                url: '/family',
                method: 'POST',
                body: data,
            }),
        }),
    })
})

export const { useCreateFamilyMutation } = familyApis;