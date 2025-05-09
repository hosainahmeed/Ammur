
import TimelineEntry from '@/components/Sections/timeline-page/TimelineEntry'
import TimelineHeader from '@/components/Sections/timeline-page/TimelineHeader'
import { timelineData } from '@/lib/timelineData'
import React from 'react'

function page() {
    return (
        <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
            <TimelineHeader />
            <div className="mt-12 space-y-16">
                {timelineData.map((entry, index) => (
                    <TimelineEntry key={entry.id} entry={entry} isAlternate={index % 2 === 1} />
                ))}
            </div>
        </div>
    )
}

export default page