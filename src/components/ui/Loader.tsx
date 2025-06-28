import Image from 'next/image';
import React from 'react';
import './loader.css';

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader rounded-full overflow-hidden">
        <Image
          src="/icons/IconOnly.svg"
          width={200}
          height={200}
          alt=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default Loader;
