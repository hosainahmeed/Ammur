'use client';
import { Alert, Breadcrumb } from 'antd';
import { SearchBar } from '@/components/interviews/SearchBar';
import VideoGrid from '@/components/interviews/VideoGrid';
import { useParams } from 'next/navigation';
import Link from 'next/link';
export default function VideoArchivePage() {
  const { slug } = useParams();
  return (
    <main className="container mx-auto px-4 py-28">
      <h1 className="md:text-3xl text-xl font-bold text-center mb-8">
        Voices of Our Legacy: Interviews & Story Archive
      </h1>
      <div className="flex gap-2 md:flex-row flex-col items-center justify-between">
        <Alert
          className="!my-3 !w-full"
          message={
            <Breadcrumb
              items={[
                {
                  title: <Link href="/">Home</Link>,
                },
                {
                  title: <Link href="/interviews">Interviews</Link>,
                },
              ]}
            />
          }
          type="info"
        />

        <div className="my-3 max-w-xl mx-auto">
          <SearchBar />
        </div>
      </div>
      <VideoGrid slug={slug as string} />
    </main>
  );
}
