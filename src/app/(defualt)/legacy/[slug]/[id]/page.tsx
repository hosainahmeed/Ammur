'use client'
import { timelineData } from '@/lib/timelineData';
import { Breadcrumb } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';

function Page() {
  const params = useParams();
  const { id, slug } = params;
  const data = timelineData.filter((item) => String(item.id) === id);

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">No Data Found</h1>
      </div>
    );
  }

  const legacy = data[0];
  const { date, description, imageUrl, title, year } = legacy;

  return (
    <div className="min-h-screen container mx-auto py-28 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumb
          className="!mb-4"
          items={[
            {
              title: <Link href="/things-to-know" className="hover:!text-gray-700 !transition">Legacy & Tribute</Link>,
            },
            {
              title: <Link href="" className="hover:!text-gray-700 !transition">{slug}</Link>,
            },
            {
              title: <Link href="" className="hover:text-gray-700 transition">{id}</Link>,
            },
          ]}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={imageUrl}
            width={1500}
            height={600}
            alt={title}
            className="w-full h-96 object-cover rounded-xl mb-6 shadow-md"
          />
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{title}</h1>
          <div className="flex items-center gap-4 text-gray-500 mb-4">
            <time className="text-lg">{year}</time>
            <span className="text-lg">{date}</span>
          </div>
          <p className="text-lg leading-relaxed text-gray-600">{description}</p>
        </motion.div>
      </motion.div>
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/legacy"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Legacy
        </Link>
      </div>
    </div>
  );
}

export default Page;