'use client'
import LegacyEntry from '@/components/lagacy/LegacyEntry';
import { PaginationControl } from '@/components/recipe/PaginationControlProps';
import { timelineData } from '@/lib/timelineData';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';

function Page() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const recipesPerPage = 6;
  const totalPages = Math.ceil(timelineData.length / recipesPerPage);

  const startIndex = (page - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const paginationTimelineData = timelineData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-28 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Family Legacy & Tributes
      </h1>
      <Breadcrumb
        items={[
          {
            title: <Link href="/legacy">Legacy & Tribute</Link>,
          },
          {
            title: <Link href="">{params.slug}</Link>,
          },
        ]}
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginationTimelineData.map((entry) => (
          <LegacyEntry slug={params.slug} key={entry.id} entry={entry} />
        ))}
      </div>
      <PaginationControl currentPage={page} totalPages={totalPages} />
    </div>
  );
}

export default Page;
