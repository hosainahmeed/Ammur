import baseApis from "@/app/provider/Redux/query/baseApis";


const legacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getLegacy: builder.query<any, { searchTerm: string }>({
      query: ({ searchTerm }) => ({
        url: '/legacies',
        method: 'GET',
        params: {
          searchTerm,
        },
      }),
      providesTags: ['legacy'],
    }),
    createLegacy: builder.mutation({
      query: (data) => ({
        url: '/legacies/create-legacy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['legacy'],
    }),
    getLegacyById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/legacies/${id}`,
        method: 'GET',
      }),
      providesTags: ['legacy'],
    }),
    getLegacyComment: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/legacy-comments`,
        method: 'GET',
        params: { legacyId: id },
      }),
      providesTags: ['legacyComment', 'legacy'],
    }),
    createLegacyComment: builder.mutation({
      query: ({ data }) => ({
        url: `/legacy-comments/create-legacy-comment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['legacyComment', 'legacy'],
    }),
    deleteLegacyComment: builder.mutation({
      query: ({ id }) => ({
        url: `/legacy-comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['legacyComment', 'legacy'],
    }),
  }),
});

export const {
  useGetLegacyQuery,
  useCreateLegacyMutation,
  useGetLegacyByIdQuery,
  useGetLegacyCommentQuery,
  useCreateLegacyCommentMutation,
  useDeleteLegacyCommentMutation
} = legacyApis;
