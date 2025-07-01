import baseApis from "../query/baseApis";


const archiveApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllArchives: builder.query<any, { searchTerm: string }>({
      query: ({ searchTerm }) => ({
        url: '/archieve-categories',
        method: 'GET',
        params: { searchTerm },
      }),
      providesTags: ['archive'],
    }),

    //sub category
    fetchAllSubArchives: builder.query<any, { id: string; searchTerm: string }>({
      query: ({ id, searchTerm }) => ({
        url: '/archieves',
        method: 'GET',
        params: { archieveCategoryId: id, searchTerm },
      }),
      providesTags: ['archive', 'archiveSub'],
    }),
    getSingleSubArchive: builder.query<any, { id: string; searchTerm: string }>({
      query: ({ id, searchTerm }) => ({
        url: `/archieves/${id}`,
        method: 'GET',
        params: { searchTerm },
      }),
      providesTags: ['archive', 'archiveSub'],
    }),
  }),
});

export const {
  useFetchAllArchivesQuery,
  //sub category
  useFetchAllSubArchivesQuery,
  useGetSingleSubArchiveQuery,
} = archiveApis;
