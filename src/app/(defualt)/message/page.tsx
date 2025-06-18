import ChatInterface from '@/components/message/ChatInterface';

export default function page() {
  return (
    <main className="flex h-[100dvh] overflow-hidden max-h-screen bg-white pt-18">
      <ChatInterface />
    </main>
  );
}
