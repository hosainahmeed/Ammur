'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Menu, MessageCircle, Send, Smile, X } from 'lucide-react';
import { useMediaQuery } from '@/hook/useMediaQuery';
import Image from 'next/image';
import { conversations, initialMessages } from '@/lib/messageData';

export default function ChatInterface() {
  const [activeConversation, setActiveConversation] = useState(
    conversations[0]
  );
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'You',
      timestamp: 'Just now',
      avatar: '/icons/IconOnly.svg',
      isCurrentUser: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex w-full container mx-auto  py-28 h-full overflow-hidden">
      {/* Mobile menu button */}
      {!sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-20 bg-amber-100 left-4 z-50 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transform transition-transform duration-300 ease-in-out lg:translate-x-0 w-full lg:w-80 bg-white border-r border-slate-200 flex flex-col z-40 absolute lg:relative h-full`}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-slate-600" />
            Family Message Board
          </h1>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 hover:bg-slate-100 cursor-pointer transition-colors ${
                activeConversation.id === conversation.id ? 'bg-slate-100' : ''
              }`}
              onClick={() => {
                setActiveConversation(conversation);
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <Image
                    width={300}
                    height={300}
                    src={conversation.avatar || '/placeholder.svg'}
                    alt={conversation.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">Family Conversation</p>
                  <p className="text-xs text-slate-500 truncate">
                    {conversation.name}
                  </p>
                </div>
                <span className="text-xs text-slate-400">
                  {conversation.timestamp}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex  flex-col h-full overflow-y-scroll">
        {/* Chat header */}
        <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-3">
          <Avatar>
            <Image
              width={300}
              height={300}
              src={activeConversation.avatar || '/placeholder.svg'}
              alt={activeConversation.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Avatar>
          <div>
            <p className="font-medium">Family Conversation</p>
            <p className="text-xs text-slate-500">{activeConversation.name}</p>
          </div>
        </div>
        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isCurrentUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.isCurrentUser ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar className="h-8 w-8 mt-1">
                    <Image
                      width={300}
                      height={300}
                      src={message.avatar || '/placeholder.svg'}
                      alt={message.sender}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isCurrentUser
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-slate-200'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Separator />
        {/* Message input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Input
              placeholder="What's on your mind..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 py-6 px-4 rounded-full border-slate-200 focus-visible:ring-slate-200"
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-slate-600"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
              className="rounded-full bg-blue-500 hover:bg-blue-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
