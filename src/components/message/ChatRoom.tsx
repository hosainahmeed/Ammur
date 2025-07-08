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
interface Message {
  _id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: string;
  fileUrl?: string;
}

const ChatRoom = ({ roomId }: { roomId: string }) => {
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

  useEffect(() => {
    setHasFetched(false);
    setMessages([]);
  }, [roomId]);

  useEffect(() => {
    if (data?.data && !hasFetched) {
      const backendMsgs = data.data.slice().reverse();
      setMessages(backendMsgs);
      setHasFetched(true);
    }
  }, [data, hasFetched]);

  useEffect(() => {
    if (!roomId || !socket) return;
    joinRoom(roomId);

    const onReceiveMessage = (msg: Message) => {
      if (msg?.senderId !== currentUser?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on('receiveMessage', onReceiveMessage);

    return () => {
      socket.off('receiveMessage', onReceiveMessage);
    };
  }, [roomId, socket, currentUser?._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !currentUser?._id) return;

    if (file) {
      await uploadImage(file)
        .unwrap()
        .then((res) => {
          console.log(res);
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

    setMessages((prev) => [...prev, optimisticMessage]);

    sendMessage({
      roomId,
      userId: currentUser?._id,
      text,
      ...(file && { fileUrl: uploadImageUrl }),
    });

    setText('');
    setFile(null);
    setUploadImageUrl('');
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

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 w-[calc(100vw-300px)] bg-gradient-to-b from-gray-50 via-white to-blue-50">
        {messages.map((msg) => (
          <div
            key={msg?._id}
            className={`flex ${
              msg?.senderId === currentUser?._id
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div className="max-w-[80%]">
              <div className="flex items-start gap-2 relative">
                <div className="flex-1">
                  <div className="text-sm font-medium justify-center text-gray-900">
                    {msg?.senderId === currentUser?._id
                      ? 'You'
                      : msg?.senderName}
                  </div>
                  <motion.div
                    className={`max-w-[500px] rounded-full px-4 py-3 shadow-md transition-all duration-200 relative ${
                      msg?.senderId === currentUser?._id
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => {
                      setHoveredMessageId(msg._id);
                    }}
                    onMouseLeave={() => {
                      setHoveredMessageId(null);
                    }}
                  >
                    {msg?.text}
                    {msg?.fileUrl && (
                      <Image
                        src={msg?.fileUrl}
                        alt={msg?.text}
                        width={500}
                        height={500}
                        className="max-w-[500px] rounded-full"
                      />
                    )}
                    <motion.div
                      className="absolute bottom-0 right-0 bg-gray-800/80 text-white px-2 py-1 rounded-full text-[10px] font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: hoveredMessageId === msg._id ? 1 : 0, y: hoveredMessageId === msg._id ? 0 : 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {new Date(msg?.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="border-t bg-white shadow-inner">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <input
              className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button className="text-xl relative cursor-pointer hover:text-blue-500 transition-colors">
              <input
                onChange={(e) => handleFileChange(e)}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
              />
              <ImAttachment />
            </button>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-xl cursor-pointer hover:text-blue-500 transition-colors"
            >
              😊
            </button>
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50"
              disabled={!text.trim()}
            >
              Send
            </button>
          </div>

          {showEmojiPicker && (
            <div className="absolute bottom-[80px] right-4 w-[320px] z-50 bg-white shadow-xl rounded-lg border border-gray-200">
              <EmojiPicker
                previewConfig={{
                  showPreview: false,
                }}
                searchDisabled
                onEmojiClick={(emoji: any) => {
                  setText((prev) => prev + emoji.emoji);
                  setShowEmojiPicker(false);
                }}
                width={320}
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
