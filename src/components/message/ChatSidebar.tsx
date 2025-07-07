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
    <ScrollArea className="h-full">
      <div className="space-y-1 p-3">
        {data?.data?.map((conversation: any) => (
          <div
            key={conversation._id}
            className={`p-3 flex items-center gap-3 rounded-lg cursor-pointer hover:bg-slate-100 transition ${
              activeConversation?._id === conversation._id
                ? 'bg-slate-100 border-l-4 border-blue-500'
                : ''
            }`}
            onClick={() => handleConversationClick(conversation)}
          >
            <div className="relative">
              <Avatar className="border border-slate-200">
                <Image
                  width={40}
                  height={40}
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
            <div className="min-w-0">
              <p className="font-medium truncate">{conversation.familyName}</p>
              <p className="text-xs text-gray-500">
                {userStatuses[conversation._id] === 'online'
                  ? 'Online'
                  : new Date(conversation.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default memo(ChatSidebar);
