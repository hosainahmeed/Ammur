import baseApis from "../query/baseApis";


export const profileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfileData: builder.query<any, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
      }),
      providesTags: ['profile'],
    }),
    updateProfileData: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/users/${id}`,
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['profile'],
    }),
  }),
});

export const { useGetProfileDataQuery, useUpdateProfileDataMutation } =
  profileApis;
