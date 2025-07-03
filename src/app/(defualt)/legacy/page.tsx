'use client';

import LegacyEntry from '@/components/lagacy/LegacyEntry';
import { useGetLegacyQuery } from '@/app/provider/Redux/service/lagecyApis';
import { Empty, Input, Spin } from 'antd';
import React, { Suspense, useEffect } from 'react';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { debounce } from 'lodash';
function LegacyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isFetching } = useGetLegacyQuery({
    searchTerm: searchTerm,
  });
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 500);

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const showLoading = isLoading || isFetching;

  return (
    <Spin spinning={isLoading}>
      <div className="container mx-auto px-4 py-28 bg-white min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">
          Family Legacy & Tributes
        </h1>
        <Input
          placeholder="Search by name"
          prefix={<SearchOutlined className="text-gray-400" />}
          suffix={
            showLoading && inputValue ? (
              <LoadingOutlined spin className="text-blue-500" />
            ) : null
          }
          value={inputValue}
          onChange={handleInputChange}
          className="max-w-md !rounded-full !mx-auto !text-lg !py-2 !border-2 !focus:border-blue-500 !transition-all !duration-200"
          size="large"
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {data?.data?.length > 0 ? (
            data?.data?.map((entry: any) => (
              <LegacyEntry key={entry?._id} entry={entry} />
            ))
          ) : (
            <div className="text-center col-span-4">
              <Empty description="No legacy entries found" />
            </div>
          )}
        </div>
      </div>
    </Spin>
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
