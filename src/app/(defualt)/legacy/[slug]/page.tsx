import LegecyEntry from '@/components/lagacy/LegecyEntry';
import { PaginationControl } from '@/components/recipe/PaginationControlProps';
import { timelineData } from '@/lib/timelineData';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';

interface PageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

function Page({ params, searchParams }: PageProps) {
  const slug = params.slug;
  const page = Number(searchParams.page) || 1;
  const recipesPerPage = 6;
  const totalPages = Math.ceil(timelineData.length / recipesPerPage);

  const startIndex = (page - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const paginationTimelineData = timelineData.slice(startIndex, endIndex);
// create this page dynamic
  return (
    <div className="container mx-auto px-4 py-28 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Family Legacy & Tributes
      </h1>
      <Breadcrumb
        items={[
          {
            title: <Link href="/things-to-know">Legacy & Tribute</Link>,
          },
          {
            title: <Link href="">{slug}</Link>,
          },
        ]}
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginationTimelineData.map((entry) => (
          <LegecyEntry slug={slug} key={entry.id} entry={entry} />
        ))}
      </div>
      <PaginationControl currentPage={page} totalPages={totalPages} />
    </div>
  );
}

export default Page;
