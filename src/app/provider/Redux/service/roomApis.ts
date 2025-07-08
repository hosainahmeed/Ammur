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
            query: ({ id, limit }) => ({
                url: `/messages/${id}/messages`,
                method: 'GET',
                params: { limit },
            }),
            providesTags: ['room'],
        }),
    })
})

export const { useGetAllRoomQuery, useGetSingleRoomQuery } = roomApis;