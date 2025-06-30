import { createApi } from '@reduxjs/toolkit/query/react';
import { socketBaseQuery } from './socketService';


export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: socketBaseQuery(),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<any, { roomId: string; message: Partial<any> }>({
      query: ({ roomId, message }) => ({
        event: 'sendMessage',
        data: { roomId, message },
      }),
    }),
    getMessages: builder.query<any[], string>({
      query: (roomId) => ({
        event: 'getMessages',
        data: { roomId },
        listenEvent: 'loadMessages',
      }),
    }),
    joinRoom: builder.mutation<any, string>({
      query: (roomId) => ({
        event: 'joinRoom',
        data: { roomId },
      }),
    }),
    leaveRoom: builder.mutation<any, string>({
      query: (roomId) => ({
        event: 'leaveRoom',
        data: { roomId },
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useJoinRoomMutation,
  useLeaveRoomMutation,
} = chatApi;