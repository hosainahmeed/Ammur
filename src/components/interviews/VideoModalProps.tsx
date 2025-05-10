"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface Video {
    id: string
    title: string
    description: string
    duration: string
    thumbnail: string
    videoUrl: string
}

interface VideoModalProps {
    video: Video
    onClose: () => void
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((err) => console.error("Could not autoplay:", err))
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.pause()
            }
        }
    }, [video])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            } else if (e.key === " " || e.key === "k") {
                e.preventDefault()
                if (videoRef.current) {
                    if (videoRef.current.paused) {
                        videoRef.current.play()
                    } else {
                        videoRef.current.pause()
                    }
                }
            } else if (e.key === "f") {
                if (document.fullscreenElement) {
                    document.exitFullscreen()
                } else {
                    videoRef.current?.requestFullscreen()
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    return (
        <Dialog open={true} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-5xl w-[95vw] p-0 overflow-hidden bg-black">
                <div className="relative">
                    <video
                        ref={videoRef}
                        src={video.videoUrl}
                        poster={video.thumbnail}
                        controls
                        className="w-full h-auto max-h-[80vh]"
                        controlsList="nodownload"
                        playsInline
                    >
                        Your browser does not support the video tag.
                    </video>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                        aria-label="Close video"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="bg-white p-4">
                    <h2 className="text-xl font-bold mb-2">{video.title}</h2>
                    <p className="text-gray-700">{video.description}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
