import baseApis from "../query/baseApis";

const roomApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getAllRoom: builder.query<any, void>({
            query: () => ({
                url: '/rooms',
                method: 'GET',
            }),
            providesTags: ['room'],
        }),
        getSingleRoom: builder.query<any, { id: string; limit?: number }>({
            query: ({ id }) => ({
                url: `/messages/${id}/messages`,
                method: 'GET',
            }),
            providesTags: ['room'],
        }),
    })
})

export const { useGetAllRoomQuery, useGetSingleRoomQuery } = roomApis;