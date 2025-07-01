'use client';
import { Alert, Breadcrumb, Spin } from 'antd';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useGetSingleInterviewQuery } from '@/app/provider/Redux/service/interviewApis';

function SingleInterView() {
  const { id, slug } = useParams();
  const { data: singleInterview } = useGetSingleInterviewQuery(id as string);
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
    <div className="my-28 min-h-screen container mx-auto px-4">
      <Alert
        className="!my-12 !w-full"
        message={
          <Breadcrumb
            items={[
              {
                title: <Link href="/interviews">Inter...</Link>,
              },
              {
                title: (
                  <Link href={`/interviews/${slug}`}>
                    {singleInterview?.data?.title.slice(0, 10)}...
                  </Link>
                ),
              },
              {
                title: singleInterview?.data?.title.slice(0, 10) + '...',
              },
            ]}
          />
        }
        type="info"
      />
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start">
        <Spin className="!w-full !h-auto !max-h-[70vh] !rounded-lg !mb-6" spinning={isBuffering}>
          <video
            ref={videoRef}
            src={singleInterview?.data?.video}
            poster={singleInterview?.data?.img}
            controls
            className="!w-full !h-auto !max-h-[70vh] !rounded-lg !mb-6"
            controlsList="nodownload"
            playsInline
            preload="auto"
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
          >
            Your browser does not support the video tag.
          </video>
        </Spin>
        <div>
          <h1 className="md:text-3xl text-xl font-bold mb-2">
            {singleInterview?.data?.title}
          </h1>
          <time className="text-sm md:text-base text-gray-500 mb-4">
            {singleInterview?.data?.duration}
          </time>
          <p className="text-lg md:text-xl text-gray-700">
            {singleInterview?.data?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(SingleInterView);
