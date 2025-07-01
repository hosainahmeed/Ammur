'use client';
import { Alert, Breadcrumb } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { useGetSingleSubArchiveQuery } from '@/app/provider/Redux/service/archiveApis';
import { imageUrl } from '@/lib/server';
import { FaArrowLeft } from 'react-icons/fa';

function Page() {
  const { id, slug } = useParams();
  const { data } = useGetSingleSubArchiveQuery({
    id: id as string,
    searchTerm: '',
  });
  return (
    <div className="md:py-28 py-28 container mx-auto px-4 sm:px-6 lg:px-8">
      <Alert
        className="!w-full !my-3"
        message={
          <Breadcrumb
            items={[
              {
                title: (
                  <Link className="!flex !items-center !gap-2" href="/archives">
                    <FaArrowLeft /> Archives
                  </Link>
                ),
              },
              {
                title: data?.data?.title,
              },
            ]}
            separator={<span className="text-gray-400">/</span>}
          />
        }
        type="info"
      />

      <div className="container mx-auto">
        <div className="mb-2 text-sm font-semibold text-blue-600">
          {data?.data?.year}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {data?.data?.title}
        </h1>

        <div className="relative w-full max-w-xl aspect-[16/9] mx-auto rounded-xl overflow-hidden shadow-lg mb-8">
          <Image
            src={imageUrl(data?.data?.img)}
            width={1200}
            height={800}
            alt={data?.data?.title}
            className="w-full h-auto max-h-[400px] aspect-[16/9] object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data?.data?.description }}
          />
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link
            href={`/archives/${slug}`}
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
