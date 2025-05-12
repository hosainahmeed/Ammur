import React from 'react'
import HeroBanner from '@/components/Sections/landing-page/HeroBanner'
import HistoryTimelineSection from '@/components/Sections/landing-page/HistoryTimelineSection'
import InterviewsStoriesSection from '@/components/Sections/landing-page/InterviewsStoriesSection'
import AboutUsSection from '@/components/Sections/landing-page/(about)/AboutUsSection'

function page() {
  return (
    <div>
      <HeroBanner />
      <AboutUsSection />
      <HistoryTimelineSection />
      <InterviewsStoriesSection />
    </div >
  )
}

export default page