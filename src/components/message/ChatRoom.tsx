'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSocket } from '@/context/SocketContext';
import { useUserContext } from '@/context/userContext';
import EmojiPicker from 'emoji-picker-react';
import { useGetSingleRoomQuery } from '@/app/provider/Redux/service/roomApis';
import { ImAttachment } from 'react-icons/im';
import { useUploadImageMutation } from '@/app/provider/Redux/service/uploadImage';
import Image from 'next/image';
import { HiMenu } from 'react-icons/hi';
import './chat.css';

interface Message {
  _id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: string;
  fileUrl?: string;
}

interface ChatRoomProps {
  roomId: string;
  isMobile: boolean;
  onToggleSidebar: () => void;
  activeConversation: any;
}

const ChatRoom = ({
  roomId,
  isMobile,
  onToggleSidebar,
  activeConversation,
}: ChatRoomProps) => {
  const { socket, sendMessage, joinRoom } = useSocket();
  const { currentUser } = useUserContext();
  const { data } = useGetSingleRoomQuery({ id: roomId, limit: 999 });
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [file, setFile] = useState<File | null | undefined>(null);
  const [uploadImageUrl, setUploadImageUrl] = useState('');
  const [uploadImage] = useUploadImageMutation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setHasFetched(false);
    setMessages([]);
  }, [roomId]);

  useEffect(() => {
    if (data?.data && !hasFetched) {
      setMessages(data?.data);
      setHasFetched(true);
    }
  }, [data, hasFetched]);

  useEffect(() => {
    if (!roomId || !socket) return;
    joinRoom(roomId);

    const onReceiveMessage = (msg: Message) => {
      if (msg?.senderId !== currentUser?._id) {
        setMessages((prev) => [msg, ...prev]);
      }
    };

    socket.on('receiveMessage', onReceiveMessage);

    return () => {
      socket.off('receiveMessage', onReceiveMessage);
    };
  }, [roomId, socket, currentUser?._id]);

  const handleSend = async () => {
    if (!text.trim() || !currentUser?._id) return;
    const formData = new FormData();

    formData.append('file', file || '');
    if (file) {
      await uploadImage({ data: formData })
        .unwrap()
        .then((res) => {
          console.log(res);
          console.log(res?.data);
          setUploadImageUrl(res?.data);
        });
    }

    const optimisticMessage: Message = {
      _id: `temp-${Date.now()}`,
      text,
      senderId: currentUser._id,
      senderName: currentUser.name || 'You',
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [optimisticMessage, ...prev]);

    sendMessage({
      roomId,
      userId: currentUser?._id,
      text,
      fileUrl: uploadImageUrl,
    });

    setText('');
    setFile(null);
    setUploadImageUrl('');
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    setFile(file);
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e: any) => {
      e.preventDefault();
      if (container) {
        container.scrollTop -= e.deltaY;
      }
    };

    container?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="flex w-screen md:w-[calc(100vw-300px)] lg:w-[calc(100vw-384px)]  flex-col  h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiMenu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {activeConversation?.img ? (
              <Image
                src={activeConversation?.img || '/placeholder.svg'}
                alt={activeConversation?.familyName}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              activeConversation?.familyName?.charAt(0) || 'C'
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {activeConversation?.familyName || 'Chat Room'}
            </h3>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        style={{ scrollBehavior: 'smooth' }}
        className="hide-scroll-bar flex-1 rotate-180 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-gray-50 via-white to-blue-50"
      >
        {messages.map((msg) => (
          <div
            key={msg?._id}
            className={`flex ${
              msg?.senderId !== currentUser?._id
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div className="max-w-[85%] md:max-w-[70%] lg:max-w-[60%]">
              <div className="flex rotate-180 items-start gap-2 relative">
                <div className="flex-1">
                  <div className="text-xs rotate-0 md:text-sm font-medium text-gray-900 mb-1">
                    {msg?.senderId === currentUser?._id ? '' : msg?.senderName}
                  </div>
                  <motion.div
                    className={`rounded-2xl rotate-0 px-3 py-2 md:px-4 md:py-3 shadow-md transition-all duration-200 relative ${
                      msg?.senderId === currentUser?._id
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
                    }`}
                    whileHover={{ scale: isMobile ? 1 : 1.02 }}
                    onMouseEnter={() => {
                      if (!isMobile) setHoveredMessageId(msg._id);
                    }}
                    onMouseLeave={() => {
                      if (!isMobile) setHoveredMessageId(null);
                    }}
                  >
                    <div className="text-sm md:text-base break-words">
                      {msg?.text}
                    </div>
                    {msg?.fileUrl && (
                      <div className="mt-2">
                        <Image
                          src={msg?.fileUrl}
                          alt={msg?.text}
                          width={300}
                          height={300}
                          className="max-w-full h-auto rounded-lg"
                        />
                      </div>
                    )}
                    {!isMobile && (
                      <motion.div
                        className="absolute -bottom-6 right-0 bg-gray-800/80 text-white px-2 py-1 rounded-full text-xs font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredMessageId === msg._id ? 1 : 0,
                          y: hoveredMessageId === msg._id ? 0 : 10,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {new Date(msg?.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                  {isMobile && (
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(msg?.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* File Preview */}
      {file && (
        <div className="px-4 py-2 bg-gray-100 border-t">
          <div className="flex items-center gap-3 max-w-xs">
            <div className="relative">
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                width={60}
                height={60}
                className="w-15 h-15 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t bg-white shadow-inner">
        <div className="p-3 md:p-4">
          <div className="flex items-end gap-2 md:gap-3">
            <div className="flex-1 min-w-0">
              <input
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm text-sm md:text-base"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={(e) => {
                  e.target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }}
                placeholder="Type your message..."
              />
            </div>

            {/* Attachment Button */}
            <button className="relative p-2 md:p-3 text-gray-600 hover:text-blue-500 transition-colors">
              <input
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                accept="image/*"
              />
              <ImAttachment className="w-5 h-5" />
            </button>

            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 md:p-3 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <span className="text-lg">😊</span>
            </button>

            {/* Send Button */}
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base font-medium"
              disabled={!text.trim()}
            >
              Send
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div
              className={`
              absolute z-50 bg-white shadow-xl rounded-lg border border-gray-200
              ${
                isMobile ? 'bottom-20 left-4 right-4' : 'bottom-20 right-4 w-80'
              }
            `}
            >
              <EmojiPicker
                previewConfig={{
                  showPreview: false,
                }}
                searchDisabled
                onEmojiClick={(emoji: any) => {
                  setText((prev) => prev + emoji.emoji);
                  setShowEmojiPicker(false);
                }}
                width={isMobile ? undefined : 320}
                height={320}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
