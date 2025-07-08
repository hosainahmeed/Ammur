'use client';
import { useEffect, useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatRoom from './ChatRoom';
import { useSocket } from '@/context/SocketContext';
import { useGetAllRoomQuery } from '@/app/provider/Redux/service/roomApis';

const ChatInterface = () => {
  const { socket } = useSocket();
  const { data: roomData, isLoading } = useGetAllRoomQuery();
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!socket) return;
    const handleStatusChange = ({ userId, status }: any) => {
      setUserStatuses((prev) => ({ ...prev, [userId]: status }));
    };

    socket.on('userStatusChange', handleStatusChange);
    return () => {
      socket.off('userStatusChange', handleStatusChange);
    };
  }, [socket]);

  useEffect(() => {
    if (!activeConversation && roomData?.data?.length > 0) {
      setActiveConversation(roomData.data[0]);
    }
  }, [roomData, activeConversation]);

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white text-gray-800">
      <div className="w-[300px] border-r border-gray-200 bg-gray-50">
        <ChatSidebar
          data={roomData}
          handleConversationClick={setActiveConversation}
          activeConversation={activeConversation}
          userStatuses={userStatuses}
        />
      </div>

      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <ChatRoom roomId={activeConversation?.roomId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            {isLoading ? (
              <div className="flex items-center justify-center h-[calc(100vh-100px)] w-[calc(100vw-300px)] text-gray-400 text-lg">
                Loading Conversation...
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                Select a conversation
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
