'use client';

import LegacyEntry from '@/components/lagacy/LegacyEntry';
import { useGetLegacyQuery } from '@/lib/lagecyApis';
// import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function LegacyList() {
  const { data, isLoading, error } = useGetLegacyQuery();
  console.log(data?.data);
  return (
    <div className="container mx-auto px-4 py-28 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Family Legacy & Tributes
      </h1>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.data?.map((entry: any) => (
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
        <div className="py-20 min-h-screen text-center">
          Loading legacy entries...
        </div>
      }
    >
      <LegacyList />
    </Suspense>
  );
}
