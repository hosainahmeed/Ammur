'use client';
import TimelineEntry from '@/components/Sections/timeline-page/TimelineEntry';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { timelineData } from '@/lib/timelineData';
import React from 'react';
import { Empty } from 'antd';

function Page() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTimelineData = timelineData.filter(({ title, description }) => {
    const titleMatches = title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const descriptionMatches = description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatches || descriptionMatches;
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <TimelineHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="mt-12 space-y-24">
        {filteredTimelineData.length === 0 ? (
          <div className="text-center text-gray-600">
            <Empty description="No results found" />
          </div>
        ) : (
          filteredTimelineData.map((entry, index) => (
            <TimelineEntry
              key={entry.id}
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
