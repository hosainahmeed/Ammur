'use client';
import ArchiveEntry from '@/components/archive/ArchiveEntry';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useFetchAllSubArchivesQuery } from '@/app/provider/Redux/service/archiveApis';
import { Alert, Breadcrumb, Empty, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isFetching } = useFetchAllSubArchivesQuery({
    id: slug,
    searchTerm: searchTerm,
  });

  const debouncedSearchTerm = debounce(
    (value: string) => setSearchTerm(value),
    500
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearchTerm(value);
  };
  const showLoading = isLoading || isFetching;

  return (
    <div className="container mx-auto px-4 py-28 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Family Archives: Preserving Our Legacy
      </h1>
      <Alert
        className="!my-3"
        message={
          <Breadcrumb
            items={[
              {
                title: (
                  <Link className="!flex !items-center !gap-2" href="/archives">
                    <FaArrowLeft /> Archives
                  </Link>
                ),
              },
            ]}
          />
        }
        type="info"
      />
      <Input
        placeholder="Search by name"
        prefix={<SearchOutlined className="text-gray-400" />}
        suffix={
          showLoading && inputValue ? (
            <LoadingOutlined spin className="text-blue-500" />
          ) : null
        }
        onChange={handleInputChange}
        className="max-w-md !rounded-full !mx-auto !text-lg !py-2 !border-2 !focus:border-blue-500 !transition-all !duration-200"
        size="large"
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.data?.length > 0 ? (
          data?.data?.map((entry: any) => (
            <ArchiveEntry key={entry._id} entry={entry} />
          ))
        ) : (
          <Empty
            description="No archives found"
            className="w-full col-span-4"
          />
        )}
      </div>
    </div>
  );
};

export default Page;
