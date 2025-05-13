import Image from 'next/image';
import React from 'react';

function page() {
  return (
    <div className="min-h-screen">
      <div className="w-full py-28 bg-[#0C469D]">
        <div className="container mx-auto relative">
          <div className="w-48 h-48 absolute bg-white rounded-full overflow-hidden p-1">
            <Image src="https://avatar.iran.liara.run/public/5" width={400} height={400} className='w-full rounded-full h-full object-cover' alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
