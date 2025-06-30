'use client';
import { Breadcrumb, Spin } from 'antd';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useGetSingleInterviewQuery } from '@/app/provider/Redux/service/interviewApis';

function SingleInterView() {
  const { id, slug } = useParams();
  const { data: singleInterview, isLoading } = useGetSingleInterviewQuery(
    id as string
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleCanPlay = () => {
      videoElement
        ?.play()
        .catch((err) => console.error('Could not autoplay:', err));
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      setIsBuffering(false);
    };

    if (videoElement) {
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('waiting', handleWaiting);
      videoElement.addEventListener('playing', handlePlaying);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('waiting', handleWaiting);
        videoElement.removeEventListener('playing', handlePlaying);
      }
    };
  }, []);

  return (
    <Spin spinning={isLoading || isBuffering}>
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
              title: singleInterview?.data?.title,
            },
          ]}
        />
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start">
          <video
            ref={videoRef}
            src={singleInterview?.data?.video}
            poster={singleInterview?.data?.img}
            controls
            className="w-full h-auto max-h-[70vh] rounded-lg mb-6"
            controlsList="nodownload"
            playsInline
            preload="auto"
          >
            Your browser does not support the video tag.
          </video>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {singleInterview?.data?.title}
            </h1>
            <time className="text-sm text-gray-500 mb-4">
              {singleInterview?.data?.duration}
            </time>
            <p className="text-lg text-gray-700">
              {singleInterview?.data?.description}
            </p>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default memo(SingleInterView);
