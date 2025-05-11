import ArchiveEntry from '@/components/archive/ArchiveEntry';
import { PaginationControl } from '@/components/recipe/PaginationControlProps';
import { timelineData } from '@/lib/timelineData';
import React from 'react';

interface HomePageProps {
  searchParams: {
    page?: string;
  };
}

const page = ({ searchParams }: HomePageProps) => {
  const page = Number(searchParams.page) || 1;
  const recipesPerPage = 6;
  const totalPages = Math.ceil(timelineData.length / recipesPerPage);

  const startIndex = (page - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const paginationTimelineData = timelineData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-28 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Family Archives: Preserving Our Legacy
      </h1>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginationTimelineData.map((entry) => (
          <ArchiveEntry key={entry.id} entry={entry} />
        ))}
      </div>
      <PaginationControl totalPages={totalPages} currentPage={page} />
    </div>
  );
};

export default page;
