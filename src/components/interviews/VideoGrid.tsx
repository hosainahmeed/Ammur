"use client"

import { useState } from "react"
import VideoCard from "./VideoCardProps"
import VideoModal from "./VideoModalProps"
import { videos } from "@/lib/interviewVideosData"



export default function VideoGrid() {
    const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
                ))}
            </div>

            {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
        </>
    )
}
