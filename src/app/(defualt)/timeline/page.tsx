'use client';
import TimelineEntry from '@/components/Sections/timeline-page/TimelineEntry';
import { Search } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { Card, Empty, Skeleton, Spin } from 'antd';
import { useGetTimelinesQuery } from '@/app/provider/Redux/service/timelineApis';
import { TimelineEntryType } from '@/types/models';

function Page() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data, isLoading } = useGetTimelinesQuery({ searchTerm: searchQuery });

  if (isLoading) {
    return (
      <div className="container mx-auto my-28 px-4 py-8 bg-white">
        {Array(2)
          .fill(0)
          .map((_, index: number) => (
            <div
              key={index}
              className={`flex items-start !mb-12 gap-4 ${
                index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <Card loading className="w-full h-48"></Card>
              <Skeleton loading title active className="w-full" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <Spin spinning={isLoading}>
      <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
        <TimelineHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="mt-12 space-y-24">
          {data?.data?.length === 0 ? (
            <div className="text-center !h-screen !flex !items-center !justify-center !text-gray-600">
              <Empty description="No results found" />
            </div>
          ) : (
            data?.data?.map((entry: TimelineEntryType, index: number) => (
              <TimelineEntry
                key={entry?._id}
                entry={entry}
                isAlternate={index % 2 === 1}
              />
            ))
          )}
        </div>
      </div>
    </Spin>
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
