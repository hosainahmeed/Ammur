"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TimelineEntryType } from "@/lib/types"

interface TimelineEntryProps {
    entry: TimelineEntryType
    isAlternate?: boolean
}

const TimelineEntry = ({ entry, isAlternate = false }: TimelineEntryProps) => {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(entry.likes)

    const handleLike = () => {
        if (liked) {
            setLikeCount((prev) => prev - 1)
        } else {
            setLikeCount((prev) => prev + 1)
        }
        setLiked(!liked)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10", isAlternate && "md:grid-flow-dense")}
        >
            {/* Image */}
            <div
                className={cn("relative overflow-hidden rounded-lg shadow-md aspect-[4/3]", isAlternate && "md:col-start-2")}
            >
                <Image
                    src={entry.imageUrl || "/placeholder.svg"}
                    alt={entry.title}
                    fill
                    className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className={cn("flex flex-col justify-center", isAlternate && "md:col-start-1")}>
                <div className="flex items-center gap-2 mb-2">
                    <time className="text-sm font-medium text-gray-500">{entry.date}</time>
                    <span className="text-xl font-bold text-blue-600">{entry.year}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{entry.title}</h2>

                <p className="text-gray-600 mb-4 leading-relaxed">{entry.description}</p>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-500 italic">
                        Explore key moments in Black history—from systemic laws and struggles to breakthroughs and triumphs.
                    </p>
                    <p className="text-sm text-gray-500 italic">
                        Each entry is more than just a date; it&lsquo;s a story of how our past shaped our present.
                    </p>
                </div>

                <button
                    onClick={handleLike}
                    className="flex items-center gap-1.5 mt-4 text-gray-500 hover:text-blue-600 transition-colors"
                >
                    <Heart size={16} className={cn("transition-all", liked ? "fill-blue-600 text-blue-600" : "fill-none")} />
                    <span className="text-sm">{likeCount}</span>
                </button>
            </div>
        </motion.div>
    )
}
export default TimelineEntry