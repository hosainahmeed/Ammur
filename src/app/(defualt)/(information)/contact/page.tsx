import GetInTouch from '@/components/Sections/inforamtion/GetInTouch';
import DynamicHeader from '@/components/share/DynamicHeader';
import React from 'react';

function page() {
  return (
    <div>
      <DynamicHeader title='Contact us' />
      <GetInTouch />
    </div>
  );
}

export default page;
