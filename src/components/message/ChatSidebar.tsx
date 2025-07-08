'use client';

import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Avatar } from 'antd';
import Image from 'next/image';
import { memo } from 'react';
import { HiX } from 'react-icons/hi';

interface ChatSidebarProps {
  data: any;
  handleConversationClick: (conversation: any) => void;
  activeConversation: any;
  userStatuses: Record<string, string>;
  isMobile: boolean;
  onCloseSidebar: () => void;
}

function ChatSidebar({
  data,
  handleConversationClick,
  activeConversation,
  userStatuses,
  isMobile,
  onCloseSidebar,
}: ChatSidebarProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
        {isMobile && (
          <button
            onClick={onCloseSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-3 md:p-4">
          {data?.data?.map((conversation: any) => (
            <div
              key={conversation._id}
              className={`p-3 md:p-4 flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-200 ${
                activeConversation?._id === conversation?._id
                  ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => handleConversationClick(conversation)}
            >
              <div className="relative flex-shrink-0">
                <Avatar
                  className="border-2 border-white bg-white"
                  size={isMobile ? 40 : 48}
                >
                  <Image
                    width={isMobile ? 40 : 48}
                    height={isMobile ? 40 : 48}
                    src={conversation.img || '/placeholder.svg'}
                    alt={conversation.familyName}
                    className="rounded-full object-cover"
                  />
                </Avatar>
                <span
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                    userStatuses[conversation._id] || 'offline'
                  )}`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate text-sm md:text-base">
                  {conversation.familyName}
                </p>
                <p className="text-xs md:text-sm text-gray-500 truncate">
                  {userStatuses[conversation._id] === 'online'
                    ? 'Online'
                    : new Date(conversation.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center justify-end flex-shrink-0">
                {userStatuses[conversation._id] === 'online' && (
                  <span className="text-xs md:text-sm text-green-500 font-medium">
                    • Online
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default memo(ChatSidebar);
