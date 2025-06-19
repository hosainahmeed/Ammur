import ChatInterface from '@/components/message/ChatInterface';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Message',
}


export default function page() {
  return (
    <main className="flex h-[100dvh] overflow-hidden max-h-screen bg-white pt-18">
      <ChatInterface />
    </main>
  );
}
