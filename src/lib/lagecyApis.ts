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
    updateLegacy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/legacies/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['legacy'],
    }),
    deleteLegacy: builder.mutation({
      query: (id) => ({
        url: `/legacies/${id}`,
        method: 'DELETE',
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
  }),
});

export const {
  useGetLegacyQuery,
  useDeleteLegacyMutation,
  useCreateLegacyMutation,
  useUpdateLegacyMutation,
  useGetLegacyByIdQuery,
} = legacyApis;
