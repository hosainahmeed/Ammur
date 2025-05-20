'use client';

import Image from 'next/image';
import { Play, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Video } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const router = useRouter();

  const handleCardClick = (slug: string) => {
    router.push(`/interviews/${slug}`);
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300  hover:shadow-lg cursor-pointer group"
      onClick={() => handleCardClick(video.id)}
    >
      <div className="relative aspect-video">
        <Image
          src={video.thumbnail || '/placeholder.svg'}
          alt={video.title}
          fill
          className="!w-full !h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all">
          <div className="h-14 w-14 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="h-7 w-7 text-primary fill-primary ml-1" />
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{video.title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{video.duration}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {video.description}
        </p>
      </CardContent>
    </Card>
  );
}
