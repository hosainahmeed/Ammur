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
    })
})

export const { useGetAllRoomQuery } = roomApis;