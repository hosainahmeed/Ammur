import React from 'react';
import DynamicHeader from '@/components/share/DynamicHeader';
import GetInTouch from '@/components/Sections/inforamtion/GetInTouch';


function Page() {
  return (
    <div>
      <DynamicHeader title="Contact us" />
      <GetInTouch />
    </div>
  );
}

export default Page;
