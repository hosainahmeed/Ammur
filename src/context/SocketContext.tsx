'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { useUserContext } from '@/context/userContext';

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (msg: {
    roomId: string;
    userId: string;
    text: string;
    file?: string;
  }) => void;
  joinRoom: (roomId: string) => void;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  sendMessage: () => {},
  joinRoom: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { currentUser } = useUserContext();
  useEffect(() => {
    const socketInstance = io('http://10.0.60.52:5001', {
      auth: {
        token: Cookies.get('accessToken') || '',
      },
      transports: ['websocket'],
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      socketInstance.emit('register', {
        userId: currentUser?._id,
        name: currentUser?.name,
      });
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [currentUser]);

  const sendMessage = (msg: {
    roomId: string;
    userId: string;
    text: string;
    fileUrl?: string;
  }) => {
    if (socket) socket.emit('sendMessage', msg);
  };

  const joinRoom = (roomId: string) => {
    if (socket) socket.emit('joinRoom', roomId);
  };

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, sendMessage, joinRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};
