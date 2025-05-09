import React from 'react'
import HeroBanner from '@/components/Sections/landing-page/HeroBanner'
import HistoryTimelineSection from '@/components/Sections/landing-page/HistoryTimelineSection'
import InterviewsStoriesSection from '@/components/Sections/landing-page/InterviewsStoriesSection'

function page() {
  return (
    <div>
      <HeroBanner />
      <HistoryTimelineSection />
      <InterviewsStoriesSection />
    </div >
  )
}

export default page