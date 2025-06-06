'use client';
import { SearchBar } from '@/components/interviews/SearchBar';
import VideoGrid from '@/components/interviews/VideoGrid';
import { useParams } from 'next/navigation';

export default function VideoArchivePage() {
  const { slug } = useParams();
  console.log(slug);
  return (
    <main className="container mx-auto px-4 py-28">
      <h1 className="text-3xl font-bold text-center mb-8">
        Voices of Our Legacy: Interviews & Story Archive
      </h1>

      <div className="mb-8 max-w-md mx-auto">
        <SearchBar />
      </div>
      <VideoGrid slug={slug} />
    </main>
  );
}
