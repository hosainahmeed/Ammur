/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo } from 'react';
import { videos } from '@/lib/interviewVideosData';
import VideoModal from './VideoModalProps';
import VideoCard from './VideoCardProps';
import Pagination from '../ui/pagination';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

export const allVideos = [
  ...videos,
  {
    id: '10',
    title: 'James Carter',
    description: "Growing Up in the South: A Boy's Journey Through Change",
    duration: '12:00 min',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl: '/videos/interview10.mp4',
  },
  {
    id: '11',
    title: 'James Carter',
    description: "Growing Up in the South: A Boy's Journey Through Change",
    duration: '12:00 min',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl: '/videos/interview11.mp4',
  },
  {
    id: '12',
    title: 'James Carter',
    description: "Growing Up in the South: A Boy's Journey Through Change",
    duration: '12:00 min',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl: '/videos/interview12.mp4',
  },
  {
    id: '13',
    title: 'James Carter',
    description: "Growing Up in the South: A Boy's Journey Through Change",
    duration: '12:00 min',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl: '/videos/interview13.mp4',
  },
  {
    id: '14',
    title: 'James Carter',
    description: "Growing Up in the South: A Boy's Journey Through Change",
    duration: '12:00 min',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl: '/videos/interview14.mp4',
  },
  {
    id: '15',
    title: 'James Carter',
    description: "Growing Up in the South: A Boy's Journey Through Change",
    duration: '12:00 min',
    thumbnail: '/placeholder.svg?height=200&width=300',
    videoUrl: '/videos/interview15.mp4',
  },
];

export default function VideoGrid({ slug }: { slug: any }) {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  // Calculate the videos to display on the current page
  const currentVideos = useMemo(() => {
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    return allVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  }, [currentPage]);

  // Calculate total number of pages
  const totalPages = Math.ceil(allVideos.length / videosPerPage);

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: <Link href="/interviews">Interviews</Link>,
          },
          {
            title: <Link href={`/interviews/${slug}`}>{slug}</Link>,
          },
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <VideoCard key={video.id} video={video} /> 
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
