'use client';

import { useEffect, useState, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useUserContext } from '@/context/userContext';
import EmojiPicker from 'emoji-picker-react';
import { useGetSingleRoomQuery } from '@/app/provider/Redux/service/roomApis';

interface Message {
  _id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: string;
}

const ChatRoom = ({ roomId }: { roomId: string }) => {
  const { socket, sendMessage, joinRoom } = useSocket();
  const { currentUser } = useUserContext();
  const { data } = useGetSingleRoomQuery({ id: roomId });

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId || !socket) return;
    joinRoom(roomId);

    const onReceiveMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('receiveMessage', onReceiveMessage);

    return () => {
      socket.off('receiveMessage', onReceiveMessage);
    };
  }, [roomId, socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim() || !currentUser?._id) return;

    sendMessage({
      roomId,
      userId: currentUser._id,
      text,
    });

    setText('');
  };
console.log("my name is hosain room",data?.data)
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 w-[calc(100vw-300px)] overflow-y-auto p-4 space-y-3">
        {data?.data?.map((msg: any) => (
          <div key={msg._id} className="text-sm">
            <div className="font-semibold text-blue-600">{msg.senderName}</div>
            <div className="text-gray-700">{msg.text}</div>
            <div className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="border-t p-4 bg-white relative">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-xl hover:opacity-70"
          >
            😊
          </button>
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-[60px] left-4 z-50 bg-white shadow-xl rounded-lg">
            <EmojiPicker
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
  );
};

export default ChatRoom;
