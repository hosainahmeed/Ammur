'use client';

import { Empty, Spin } from 'antd';
import VideoCard from './VideoCardProps';
import { useGetAllInterviewQuery } from '@/app/provider/Redux/service/interviewApis';

export default function VideoGrid({ slug }: { slug: string }) {
  const { data, isLoading } = useGetAllInterviewQuery(
    { id: slug },
    { skip: !slug }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  const videos = data?.data;

  return (
    <div>
      {videos?.length === 0 ? (
        <Empty description="No videos found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos?.map((video: any) => (
            <VideoCard key={video?._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
