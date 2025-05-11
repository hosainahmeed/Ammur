import GetInTouch from '@/components/Sections/inforamtion/GetInTouch';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';

function page() {
  return (
    <div className="container mx-auto px-2 py-28">
      <Breadcrumb
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: <Link href="/contact">contact-us</Link>,
          },
        ]}
      />
      <GetInTouch />
    </div>
  );
}

export default page;
