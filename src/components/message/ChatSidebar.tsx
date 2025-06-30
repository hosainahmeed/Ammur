import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Avatar } from 'antd';
import Image from 'next/image';
import React, { memo } from 'react';

function ChatSidebar({
  data,
  handleConversationClick,
  activeConversation,
}: any) {
  console.log(data?.data);
  return (
    <ScrollArea className="flex-1 px-2 pb-2">
      <div className="space-y-1 pt-1">
        {data?.data.map((conversation: any) => (
          <div
            key={conversation?._id}
            className={`p-3 my-1 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors ${
              activeConversation?._id === conversation?._id
                ? 'bg-slate-100 border-l-4 border-blue-500'
                : ''
            }`}
            onClick={() => handleConversationClick(conversation)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-slate-200">
                <Image
                  width={40}
                  height={40}
                  src={conversation?.img || '/placeholder.svg'}
                  alt={conversation?.familyName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-slate-800">
                  {conversation?.familyName}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {new Date(conversation?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default memo(ChatSidebar);
