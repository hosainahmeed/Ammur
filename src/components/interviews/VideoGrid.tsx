'use client';

import VideoCard from './VideoCardProps';
import { useGetAllInterviewQuery } from '@/app/provider/Redux/service/interviewApis';

export default function VideoGrid({ slug }: { slug: string }) {
  const { data } = useGetAllInterviewQuery({ id: slug }, { skip: !slug });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.data?.map((video: any) => (
          <VideoCard key={video?._id} video={video} />
        ))}
      </div>
    </div>
  );
}
