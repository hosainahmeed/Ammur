import Image from 'next/image';
import React from 'react';
interface Iheading {
  title: string;
}
function DynamicHeader({ title = 'About Us' }: Iheading) {
  return (
    <div className="relative">
      <Image
        src={'/bg1.jpg'}
        width={1500}
        height={1200}
        alt={`${title}_bg_image`}
        className="w-full h-64 md:h-96 md:object-bottom-right object-cover grayscale"
      />
      <h1 className="absolute  top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 md:text-6xl text-4xl font-black container !text-white mx-auto z-[777]">
        {title}
      </h1>
    </div>
  );
}

export default DynamicHeader;
