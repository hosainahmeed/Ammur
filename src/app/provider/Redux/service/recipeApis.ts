import baseApis from "../query/baseApis";

const recipeApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getRecipe: builder.query<any, void>({
      query: () => ({
        url: `/recipes`,
        method: 'GET',
      }),
      providesTags: ['recipe'],
    }),
    createRecipe: builder.mutation({
      query: ({ data }) => ({
        url: `/recipes/create-recipe`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['recipe'],
    }),
    updateRecipe: builder.mutation<string, any>({
      query: ({ id, data }) => ({
        url: `/recipes/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['recipe'],
    }),
    deleteRecipe: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['recipe'],
    }),
    getSingleRecipe: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/recipes/${id}`,
        method: 'GET',
      }),
      providesTags: ['recipe'],
    }),
  }),
});

export const {
  useGetRecipeQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useGetSingleRecipeQuery,
} = recipeApis;
