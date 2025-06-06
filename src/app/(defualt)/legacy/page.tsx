'use client';

import LegacyEntry from '@/components/lagacy/LegacyEntry';
import { timelineData } from '@/lib/timelineData';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function LegacyList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const recipesPerPage = 6;

  const startIndex = (page - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const paginationTimelineData = timelineData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-28 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Family Legacy & Tributes
      </h1>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginationTimelineData.map((entry) => (
          <LegacyEntry key={entry.id} entry={entry} />
        ))}
      </div>
      {/* <PaginationControl currentPage={page} totalPages={totalPages} /> */}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center">Loading legacy entries...</div>
      }
    >
      <LegacyList />
    </Suspense>
  );
}
