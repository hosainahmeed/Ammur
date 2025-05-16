'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PanelLeftOpen, MessageCircle, Send, X, PlusCircle } from 'lucide-react';
import { useMediaQuery } from '@/hook/useMediaQuery';
import Image from 'next/image';
import { conversations, initialMessages } from '@/lib/messageData';

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  timestamp: string;
}

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  avatar: string;
  isCurrentUser: boolean;
}

export default function ChatInterface() {
  const [activeConversation, setActiveConversation] = useState<Conversation>(
    conversations[0]
  );
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (): void => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatDate = (timestamp: string): string => {
    if (timestamp === 'Just now') return timestamp;

    return timestamp;
  };

  const handleConversationClick = (conversation: Conversation): void => {
    setActiveConversation(conversation);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      {/* Mobile menu button */}
      {!sidebarOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-20 right-4 z-50 lg:hidden bg-white shadow-md rounded-full"
          onClick={() => setSidebarOpen(true)}
        >
          <PanelLeftOpen className="h-5 w-5 text-slate-600" />
        </Button>
      )}

      {/* Sidebar - Now sticky */}
      <div
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transform transition-all duration-300 ease-in-out fixed lg:sticky lg:top-0 lg:left-0 z-40 
        h-full w-full max-w-xs sm:max-w-sm bg-white border-r border-slate-200 flex flex-col shadow-lg lg:shadow-none`}
      >
        {/* Sticky header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h1 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            Family Board
          </h1>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-slate-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* New conversation button - Sticky */}
        <div className="p-2 sticky top-16 bg-white z-10">
          <Button variant="outline" className="w-full gap-2 text-slate-600">
            <PlusCircle className="h-4 w-4" /> New Conversation
          </Button>
        </div>

        {/* Conversation list */}
        <ScrollArea className="flex-1 px-2 pb-2">
          <div className="space-y-1 pt-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 my-1 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors ${activeConversation.id === conversation.id
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
                      src={conversation.avatar || '/placeholder.svg'}
                      alt={conversation.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-800">
                      Family Conversation
                    </p>
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
          </div>
        </ScrollArea>

        {/* User profile section - Sticky bottom */}
        <div className="p-3 border-t border-slate-200 bg-white sticky bottom-0 mt-auto">
          <div className="flex items-center gap-3">
            <Avatar className="border-2 border-blue-200">
              <Image
                width={40}
                height={40}
                src="/icons/IconOnly.svg"
                alt="Your profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">Your Account</p>
              <p className="text-xs text-slate-500">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full w-full">
        {/* Chat header */}
        <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
          <Avatar className="border-2 border-slate-200">
            <Image
              width={40}
              height={40}
              src={activeConversation.avatar || '/placeholder.svg'}
              alt={activeConversation.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-slate-800">Family Conversation</p>
            <p className="text-xs text-slate-500">{activeConversation.name}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {messages.map((message, index) => {
              const showDateSeparator =
                index === 0 ||
                messages[index - 1]?.timestamp !== message.timestamp;

              return (
                <div key={message.id} className="flex flex-col">
                  {showDateSeparator && (
                    <div className="flex justify-center my-4">
                      <span className="px-4 py-1 bg-slate-200 rounded-full text-xs text-slate-600">
                        {formatDate(message.timestamp)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    <div
                      className={`flex gap-2 max-w-[85%] ${message.isCurrentUser ? 'flex-row-reverse' : ''
                        }`}
                    >
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <Image
                          width={32}
                          height={32}
                          src={message.avatar || '/placeholder.svg'}
                          alt={message.sender}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      </Avatar>
                      <div>
                        <div
                          className={`p-3 rounded-2xl ${message.isCurrentUser
                            ? 'bg-blue-500 !text-white'
                            : 'bg-white border border-slate-200 text-slate-800'
                            }`}
                        >
                          {!message.isCurrentUser && (
                            <p className="text-xs font-medium text-slate-600 mb-1">
                              {message.sender}
                            </p>
                          )}
                          <p className="text-sm whitespace-pre-wrap">
                            {message.text}
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 mx-1">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message input */}
        <div className="p-3 bg-white border-t border-slate-200 sticky bottom-0 z-10">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1 py-6 px-4 rounded-full border-slate-200 focus-visible:ring-blue-400 focus-visible:ring-offset-0"
            />
            <Button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
              className="!rounded-full !py-6 !bg-blue-500 hover:!bg-blue-600 !text-white !px-8"
            >
              <Send className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


