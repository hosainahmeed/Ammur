/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { timelineData } from '@/lib/timelineData';
import { Breadcrumb } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

function Page({ params }: any) {
  const archive: any = timelineData.find((r) => r.id === params.id);
  const { description, imageUrl, title, year } = archive;
  const { slug } = useParams();
  return (
    <div className="md:py-28 py-28 container mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="mb-8">
        <Breadcrumb
          items={[
            {
              title: (
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              ),
            },

            {
              title: (
                <Link
                  href="/archives"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Archives
                </Link>
              ),
            },
            {
              title: (
                <Link
                  href={`/archives/${slug}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {slug}
                </Link>
              ),
            },
            {
              title: <span className="text-blue-600 font-medium">{title}</span>,
            },
          ]}
          separator={<span className="text-gray-400">/</span>}
        />
      </nav>

      <div className="container mx-auto">
        <div className="mb-2 text-sm font-semibold text-blue-600">{year}</div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {title}
        </h1>

        <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
          <Image
            src={imageUrl}
            width={1500}
            height={800}
            alt={title}
            className="w-full h-auto max-h-[600px] object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-lg leading-relaxed mb-6">{description}</p>
          {description.length > 500 && (
            <p className="text-lg leading-relaxed">{description}</p>
          )}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            href="/archives"
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
            Back to Archives
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
