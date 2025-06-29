import baseApis from "../query/baseApis";

const timelineApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTimelines: builder.query({
      query: ({ searchTerm }: { searchTerm: string }) => ({
        url: `/timelines`,
        method: 'GET',
        params: { searchTerm },
      }),
      providesTags: ['timeline'],
    }),
    createTimelineEntry: builder.mutation({
      query: ({ data }) => ({
        url: `/timelines/create-timeline`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['timeline'],
    }),
    deleteTimelineEntry: builder.mutation({
      query: ({ id }) => ({
        url: `/timelines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['timeline'],
    }),
    getSingleTimelineEntry: builder.query({
      query: ({ id }) => ({
        url: `/timelines/${id}`,
        method: 'GET',
      }),
      providesTags: ['timelineSingle'],
    }),
    updateTimelineEntry: builder.mutation({
      query: ({ id, data }) => ({
        url: `/timelines/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['timeline', 'timelineSingle'],
    }),
    getComment: builder.query<any, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/comments`,
        method: 'GET',
        params: { timelineId: id },
      }),
      providesTags: ['comment', 'timelineSingle', 'timeline'],
    }),
    createComment: builder.mutation({
      query: ({ data }) => ({
        url: `/comments/create-comment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment', 'timelineSingle', 'timeline'],
    }),
  }),
});

export const {
  useGetTimelinesQuery,
  useCreateTimelineEntryMutation,
  useDeleteTimelineEntryMutation,
  useGetSingleTimelineEntryQuery,
  useUpdateTimelineEntryMutation,
  //comment
  useGetCommentQuery,
  useCreateCommentMutation,
} = timelineApis;
