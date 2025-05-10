"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { Slider } from "@/components/ui/slider"

interface VideoControlsProps {
    videoRef: React.RefObject<HTMLVideoElement>
}

export function VideoControls({ videoRef }: VideoControlsProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)
        const handleTimeUpdate = () => setCurrentTime(video.currentTime)
        const handleDurationChange = () => setDuration(video.duration)
        const handleVolumeChange = () => setVolume(video.volume)
        const handleMute = () => setIsMuted(video.muted)

        video.addEventListener("play", handlePlay)
        video.addEventListener("pause", handlePause)
        video.addEventListener("timeupdate", handleTimeUpdate)
        video.addEventListener("durationchange", handleDurationChange)
        video.addEventListener("volumechange", handleVolumeChange)
        video.addEventListener("volumechange", handleMute)

        return () => {
            video.removeEventListener("play", handlePlay)
            video.removeEventListener("pause", handlePause)
            video.removeEventListener("timeupdate", handleTimeUpdate)
            video.removeEventListener("durationchange", handleDurationChange)
            video.removeEventListener("volumechange", handleVolumeChange)
            video.removeEventListener("volumechange", handleMute)
        }
    }, [videoRef])

    // Handle fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }, [])

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return

        if (video.paused) {
            video.play()
        } else {
            video.pause()
        }
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (!video) return

        video.muted = !video.muted
    }

    const toggleFullscreen = () => {
        if (!videoRef.current) return

        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            videoRef.current.requestFullscreen()
        }
    }

    const handleSeek = (value: number[]) => {
        const video = videoRef.current
        if (!video) return

        video.currentTime = value[0]
    }

    const handleVolumeChange = (value: number[]) => {
        const video = videoRef.current
        if (!video) return

        video.volume = value[0]
        video.muted = value[0] === 0
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`
    }

    return (
        <div className="flex flex-col gap-2 p-3 bg-black/80 text-white">
            <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className="cursor-pointer"
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="p-1 hover:bg-white/20 rounded-full">
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>

                    <div className="flex items-center gap-2">
                        <button onClick={toggleMute} className="p-1 hover:bg-white/20 rounded-full">
                            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                        <Slider
                            value={[isMuted ? 0 : volume]}
                            max={1}
                            step={0.01}
                            onValueChange={handleVolumeChange}
                            className="w-20 cursor-pointer"
                        />
                    </div>

                    <div className="text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>

                <button onClick={toggleFullscreen} className="p-1 hover:bg-white/20 rounded-full">
                    {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </button>
            </div>
        </div>
    )
}
