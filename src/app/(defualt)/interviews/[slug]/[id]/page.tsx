/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { allVideos } from '@/components/interviews/VideoGrid';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { memo, useEffect, useRef } from 'react';

function SingleInterView() {
  const { id, slug } = useParams();
  const video = allVideos.filter((item) => String(item.id) === id);
  const data = video[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.error('Could not autoplay:', err));
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Video Not Found
        </h2>
        <p className="text-gray-500">
          The interview you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="my-28 min-h-screen container mx-auto px-4">
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
          {
            title: data.title,
          },
        ]}
      />
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start">
        <video
          ref={videoRef}
          src={data.videoUrl}
          poster={data.thumbnail}
          controls
          className="w-full h-auto max-h-[70vh] rounded-lg mb-6"
          controlsList="nodownload"
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        <div>
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <time className="text-sm text-gray-500 mb-4">{data.duration}</time>
          <p className="text-lg text-gray-700">{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(SingleInterView);
