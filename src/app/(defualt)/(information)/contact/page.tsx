import DynamicHeader from '@/components/share/DynamicHeader';
import React from 'react';
import dynamic from 'next/dynamic';

const GetInTouch = dynamic(
  () => import('@/components/Sections/inforamtion/GetInTouch'),
  { ssr: false } 
);

function Page() {
  return (
    <div>
      <DynamicHeader title="Contact us" />
      <GetInTouch />
    </div>
  );
}

export default Page;
