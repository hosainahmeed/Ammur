'use client';
import { useEffect, useState } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatRoom from './ChatRoom';
import { useSocket } from '@/context/SocketContext';
import { useGetAllRoomQuery } from '@/app/provider/Redux/service/roomApis';
import { Spin } from 'antd';

const ChatInterface = () => {
  const { socket } = useSocket();
  const { data: roomData, isLoading } = useGetAllRoomQuery();
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleConversationClick = (conversation: any) => {
    setActiveConversation(conversation);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Spin spinning />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white text-gray-800 relative">
      {/* Mobile Overlay */}
      {isMobile && showSidebar && (
        <div
          className="fixed inset-0 bg-transparent z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${
          isMobile
            ? 'fixed left-0 h-full z-50 transform transition-transform duration-300'
            : 'relative'
        }
        ${isMobile && !showSidebar ? '-translate-x-full' : 'translate-x-0'}
        w-80 md:w-72 lg:w-80 xl:w-96 
        border-r border-gray-200 bg-gray-50
        ${isMobile ? 'shadow-lg' : ''}
      `}
      >
        <ChatSidebar
          data={roomData}
          handleConversationClick={handleConversationClick}
          activeConversation={activeConversation}
          userStatuses={userStatuses}
          isMobile={isMobile}
          onCloseSidebar={() => setShowSidebar(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="md:flex-1 w-full flex flex-col min-w-0">
        {activeConversation ? (
          <ChatRoom
            roomId={activeConversation?.roomId}
            isMobile={isMobile}
            onToggleSidebar={toggleSidebar}
            activeConversation={activeConversation}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg px-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-center">
                Select a conversation to start chatting
              </p>
              {isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View Conversations
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
