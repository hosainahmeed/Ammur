'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import {
  PanelLeftOpen,
  MessageCircle,
  Send,
  X,
  PlusCircle,
  Smile,
} from 'lucide-react';
import { useMediaQuery } from '@/hook/useMediaQuery';
import Image from 'next/image';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useGetAllRoomQuery } from '@/app/provider/Redux/service/roomApis';
import ChatSidebat from './ChatSidebar';
import { useSocket } from '@/context/SocketContext';

interface Conversation {
  _id: string;
  familyName: string;
  img: string;
  timestamp?: string;
}

interface Message {
  _id: string;
  text: string;
  sender: string;
  timestamp?: string;
  avatar: string;
  isCurrentUser: boolean;
  file?: {
    name: string;
    type: string;
    url: string;
    size?: string;
  };
}

export default function ChatInterface() {
  const { socket, isConnected } = useSocket();
  const { data, isLoading, error } = useGetAllRoomQuery();

  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  console.log(data?.data);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [filePreview, setFilePreview] = useState<{
    name: string;
    type: string;
    url: string;
    size?: string;
  } | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!socket || !activeConversation) return;

    socket.emit('joinRoom', { roomId: activeConversation._id });

    return () => {
      socket.emit('leaveRoom', { roomId: activeConversation._id });
    };
  }, [socket, activeConversation]);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    };

    const handleLoadMessages = (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
      scrollToBottom();
    };

    socket.on('newMessage', handleNewMessage);
    socket.on('loadMessages', handleLoadMessages);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('loadMessages', handleLoadMessages);
    };
  }, [socket]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filePreview = {
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      size: formatFileSize(file.size),
    };

    setFilePreview(filePreview);
    setShowEmojiPicker(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const removeFilePreview = () => {
    if (filePreview?.url) {
      URL.revokeObjectURL(filePreview.url);
    }
    setFilePreview(null);
  };

  useEffect(() => {
    if (!socket || !activeConversation) return;
    socket.emit('getMessages', { roomId: activeConversation._id });
  }, [socket, activeConversation]);

  const handleSendMessage = (): void => {
    if (
      (newMessage.trim() === '' && !filePreview) ||
      !socket ||
      !activeConversation
    )
      return;

    const newMsg: Message = {
      _id: Date.now().toString(),
      text: newMessage,
      sender: 'You',
      timestamp: new Date().toISOString(),
      avatar: '/icons/IconOnly.svg',
      isCurrentUser: true,
      ...(filePreview && { file: filePreview }),
    };

    // Emit the message to the server
    socket.emit('sendMessage', {
      roomId: activeConversation._id,
      message: newMsg,
    });

    // Optimistically update the UI
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');
    removeFilePreview();
    setShowEmojiPicker(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

  const handleConversationClick = useCallback(
    (conversation: Conversation) => {
      setActiveConversation(conversation);
      if (isMobile) setSidebarOpen(false);
    },
    [isMobile]
  );

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <div className="flex h-[calc(100vh-70px)] w-full overflow-hidden bg-slate-50">
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

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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

        {/* New conversation button */}
        <div className="p-2 sticky top-16 bg-white z-10">
          <Button variant="outline" className="w-full gap-2 text-slate-600">
            <PlusCircle className="h-4 w-4" /> New Conversation
          </Button>
        </div>

        {/* Conversation list */}
        <ChatSidebat
          activeConversation={activeConversation}
          handleConversationClick={handleConversationClick}
          data={data}
        />

        {/* User profile section */}
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
              src={activeConversation?.img || '/placeholder.svg'}
              alt={activeConversation?.familyName || 'Family'}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-slate-800">Family Conversation</p>
            <p className="text-xs text-slate-500">
              {activeConversation?.familyName}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          <div className="flex flex-col gap-4 mx-auto">
            {messages.map((message, index) => {
              const showDateSeparator =
                index === 0 ||
                messages[index - 1]?.timestamp !== message?.timestamp;

              return (
                <div key={message?._id} className="flex flex-col !w-full">
                  {showDateSeparator && (
                    <div className="flex justify-center my-4">
                      <span className="px-4 py-1 bg-slate-200 rounded-full text-xs text-slate-600">
                        {formatDate(message?.timestamp || '')}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${
                      message?.isCurrentUser ? 'justify-end' : 'justify-start'
                    } w-full`}
                  >
                    <div
                      className={`flex gap-2 max-w-[85%] ${
                        message?.isCurrentUser ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                        <Image
                          width={32}
                          height={32}
                          src={message?.avatar || '/placeholder.svg'}
                          alt={message?.sender}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      </Avatar>
                      <div>
                        <div
                          className={`p-3 rounded-2xl ${
                            message?.isCurrentUser
                              ? 'bg-blue-500 !text-white'
                              : 'bg-white border border-slate-200 text-slate-800'
                          }`}
                        >
                          {!message?.isCurrentUser && (
                            <p className="text-xs font-medium text-slate-600 mb-1">
                              {message?.sender}
                            </p>
                          )}
                          {message?.file && (
                            <div className="mb-2">
                              {message?.file.type.startsWith('image/') ? (
                                <Image
                                  width={200}
                                  height={200}
                                  src={message?.file.url}
                                  alt={message?.file.name}
                                  className="max-w-full max-h-64 rounded-lg"
                                />
                              ) : (
                                <a
                                  href={message?.file.url}
                                  download={message?.file.name}
                                  className="flex items-center gap-2 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-slate-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <div>
                                    <p className="text-sm font-medium">
                                      {message?.file.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      {message?.file.size}
                                    </p>
                                  </div>
                                </a>
                              )}
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap">
                            {message?.text}
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 mx-1">
                          {message?.timestamp}
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

        {/* Message input with file upload */}
        <div className="p-3 bg-white border-t border-slate-200 sticky bottom-0 z-10">
          {/* File preview */}
          {filePreview && (
            <div className="mb-2 p-2 bg-slate-50 rounded-lg relative">
              <button
                onClick={removeFilePreview}
                className="absolute top-1 right-1 p-1 rounded-full bg-slate-200 hover:bg-slate-300"
              >
                <X className="h-3 w-3" />
              </button>

              {filePreview.type.startsWith('image/') ? (
                <div className="flex items-center gap-3">
                  <Image
                    width={200}
                    height={200}
                    src={filePreview.url}
                    alt="Preview"
                    className="h-12 w-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium truncate">
                      {filePreview.name}
                    </p>
                    <p className="text-xs text-slate-500">{filePreview.size}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-slate-200 rounded flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-slate-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate">
                      {filePreview.name}
                    </p>
                    <p className="text-xs text-slate-500">{filePreview.size}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />

            {/* File upload button */}
            <label
              htmlFor="file-upload"
              className="p-2 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </label>

            {/* Emoji picker button and picker */}
            <div className="relative" ref={emojiPickerRef}>
              <button
                type="button"
                onClick={toggleEmojiPicker}
                className="p-2 rounded-full hover:bg-slate-100"
              >
                <Smile className="h-5 w-5 text-slate-500" />
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-12 left-0 z-50">
                  <EmojiPicker
                    width={300}
                    height={350}
                    onEmojiClick={onEmojiClick}
                    previewConfig={{ showPreview: true }}
                  />
                </div>
              )}
            </div>

            <Input
              placeholder="Type your message?..."
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1 py-6 px-4 rounded-full border-slate-200 focus-visible:ring-blue-400 focus-visible:ring-offset-0"
            />
            <Button
              onClick={handleSendMessage}
              disabled={newMessage?.trim() === '' && !filePreview}
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
