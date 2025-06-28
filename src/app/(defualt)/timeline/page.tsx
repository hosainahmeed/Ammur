'use client';
import TimelineEntry from '@/components/Sections/timeline-page/TimelineEntry';
import { Search } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { Empty } from 'antd';
import { useGetTimelinesQuery } from '@/app/provider/Redux/service/timelineApis';

function Page() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data } = useGetTimelinesQuery({ searchTerm: searchQuery });

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <TimelineHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="mt-12 space-y-24">
        {data?.data?.length === 0 ? (
          <div className="text-center text-gray-600">
            <Empty description="No results found" />
          </div>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data?.map((entry: any, index: number) => (
            <TimelineEntry
              key={entry?._id}
              entry={entry}
              isAlternate={index % 2 === 1}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Page;

const TimelineHeader = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex mt-28 flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-gray-900">
        History timeline
      </h1>

      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
