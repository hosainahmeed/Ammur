import baseApis from "../query/baseApis";

const uploadImage = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (data) => ({
                url: '/upload',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useUploadImageMutation } = uploadImage;
