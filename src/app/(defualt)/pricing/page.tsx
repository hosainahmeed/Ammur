import Pricing from '@/components/steps/Pricing'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Pricing',
}


function page() {
    return (
        <div className='my-28 container mx-auto'>
            <Pricing />
        </div>
    )
}

export default page