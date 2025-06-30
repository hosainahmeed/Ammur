import { io, Socket } from 'socket.io-client';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { url } from '@/lib/server';

type SocketBaseQueryArgs = {
    event: string;
    data?: any;
    listenEvent?: string;
};

export const socketBaseQuery = (): BaseQueryFn<SocketBaseQueryArgs> => {
    let socket: Socket;

    return async ({ event, data, listenEvent }) => {
        if (!socket) {
            socket = io(url || 'http://localhost:4000', {
                path: '/message',
                withCredentials: true,
            });
        }

        return new Promise((resolve) => {
            if (listenEvent) {
                socket.once(listenEvent, (response) => {
                    resolve({ data: response });
                });
            }

            socket.emit(event, data, (response: any) => {
                if (!listenEvent) {
                    resolve({ data: response });
                }
            });
        });
    };
};

export const initializeSocket = () => {
    const socket = io(url || 'http://localhost:4000', {
        path: '/message',
        withCredentials: true,
    });

    return socket;
};

export const subscribeToMessages = (
    socket: Socket,
    roomId: string,
    callback: (message: any) => any
) => {
    socket.emit('joinRoom', { roomId });
    socket.on('newMessage', callback);

    return () => {
        socket.off('newMessage', callback);
        socket.emit('leaveRoom', { roomId });
    };
};