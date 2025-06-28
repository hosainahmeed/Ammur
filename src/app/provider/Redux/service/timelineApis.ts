import baseApis from "../query/baseApis";

const timelineApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTimelines: builder.query({
      query: ({ searchTerm }) => ({
        url: `/timelines`,
        method: 'GET',
        params: { searchTerm: searchTerm },
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
  }),
});

export const {
  useGetTimelinesQuery,
  useCreateTimelineEntryMutation,
  useDeleteTimelineEntryMutation,
  useGetSingleTimelineEntryQuery,
  useUpdateTimelineEntryMutation,
} = timelineApis;
