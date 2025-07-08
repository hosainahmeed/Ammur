'use client';

import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Avatar } from 'antd';
import Image from 'next/image';
import { memo } from 'react';

interface ChatSidebarProps {
  data: any;
  handleConversationClick: (conversation: any) => void;
  activeConversation: any;
  userStatuses: Record<string, string>;
}

function ChatSidebar({
  data,
  handleConversationClick,
  activeConversation,
  userStatuses,
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
    <ScrollArea className="h-full bg-gray-50">
      <div className="space-y-2 p-4">
        {data?.data?.map((conversation: any) => (
          <div
            key={conversation._id}
            className={`p-4 flex items-center gap-4 rounded-xl cursor-pointer transition-all duration-200 ${
              activeConversation?._id === conversation?._id
                ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleConversationClick(conversation)}
          >
            <div className="relative">
              <Avatar className="border-2 border-white bg-white">
                <Image
                  width={48}
                  height={48}
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
              <p className="font-medium text-gray-900 truncate">{conversation.familyName}</p>
              <p className="text-sm text-gray-500">
                {userStatuses[conversation._id] === 'online'
                  ? 'Online'
                  : new Date(conversation.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center justify-end flex-1">
              {userStatuses[conversation._id] === 'online' && (
                <span className="text-sm text-green-500">• Online</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default memo(ChatSidebar);
