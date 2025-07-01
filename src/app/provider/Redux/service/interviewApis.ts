import baseApis from "../query/baseApis";


const interviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    //category
    getAllInterCategory: builder.query<any, void>({
      query: () => ({
        url: '/interview-categories',
        method: 'GET',
      }),
      providesTags: ['interviewCategory'],
    }),
    // interview
    getAllInterview: builder.query({
      query: ({ id }) => ({
        url: `/interviews/category-id/${id}`,
        method: 'GET',
      }),
      providesTags: ['interview'],
    }),
    getSingleInterview: builder.query({
      query: (id) => ({
        url: `/interviews/${id}`,
        method: 'GET',
      }),
      providesTags: ['interview'],
    }),
  }),
});

export const {
  //category
  useGetAllInterCategoryQuery,
  // interview CRUD
  useGetAllInterviewQuery,
  useGetSingleInterviewQuery,
} = interviewApis;
