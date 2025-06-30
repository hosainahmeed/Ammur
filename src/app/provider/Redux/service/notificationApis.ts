import baseApis from "../query/baseApis";

const notificationApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<any, void>({
      query: () => ({
        url: '/notifications',
        method: 'GET',
      }),
      providesTags: ['notification'],
    }),
    markAsRead: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/notifications/${id}/read`,
        method: 'POST',
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsReadMutation } =
  notificationApis;
