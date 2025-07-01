'use client';

import { Alert, Breadcrumb, Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useGetLegacyByIdQuery } from '@/app/provider/Redux/service/lagecyApis';
import { imageUrl } from '@/lib/server';
import dayjs from 'dayjs';

function Page() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetLegacyByIdQuery({ id });
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }
  if (data?.data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">No Data Found</h1>
      </div>
    );
  }
  const {
    title,
    familyName,
    dateOfBirth,
    burial,
    description,
    img,
    createdAt,
  } = data?.data;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div
        className="min-h-screen container mx-auto py-20 px-4 md:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Alert
          className="!w-full !my-3"
          message={
            <Breadcrumb
              items={[
                {
                  title: <Link href="/legacy">Legacy & Tribute</Link>,
                },
                {
                  title: <Link href="">{title.slice(0, 20)}...</Link>,
                },
              ]}
            />
          }
          type="info"
        />
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={imageUrl(img)}
            width={700}
            height={600}
            alt={title}
            className="w-full h-96 object-cover rounded-xl mb-6 shadow-md"
          />
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              {title}
            </h1>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Family Name:</strong> {familyName}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Date of Birth:</strong>{' '}
              {dayjs(dateOfBirth).format('MMMM D, YYYY')}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Burial:</strong> {burial}
            </p>
            <Tag className="!w-fit" color="blue">
              <strong>Created At: </strong>
              {dayjs(createdAt).format('MMMM D, YYYY')}
            </Tag>
            <div
              className="prose prose-lg text-gray-700"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </motion.div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex justify-start">
          <Link
            href="/legacy"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
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
      </motion.div>
    </Suspense>
  );
}

export default Page;
