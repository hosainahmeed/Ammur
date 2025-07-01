'use client';
import { Card, Empty, Spin } from 'antd';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFetchAllArchivesQuery } from '@/app/provider/Redux/service/archiveApis';
import { Input } from 'antd';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { debounce } from 'lodash';
interface Archive {
  id: string;
  img: string;
  isDeleted: boolean;
  title: string;
  updatedAt: string;
  _id: string;
}

export default function Archives() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { data, isLoading, isFetching } = useFetchAllArchivesQuery({
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

  const handleClick = (slug: string) => {
    router.push(`/archives/${slug}`);
  };
  const showLoading = isLoading || isFetching;

  return (
    <Spin spinning={isLoading}>
      <div className="md:py-28 py-12 min-h-screen">
        <Head>
          <title className="md:text-2xl text-base font-bold">
            Archive Categories
          </title>
        </Head>
        <main className="container mx-auto px-4 py-12">
          <h1 className="md:text-3xl text-xl font-bold mb-2">
            Archive Categories
          </h1>
          <Input
            placeholder="Search by name"
            prefix={<SearchOutlined className="text-gray-400" />}
            suffix={
              showLoading && inputValue ? (
                <LoadingOutlined spin className="text-blue-500" />
              ) : null
            }
            onChange={handleInputChange}
            className="max-w-md !rounded-full !mb-6 !mx-auto !text-lg !py-2 !border-2 !focus:border-blue-500 !transition-all !duration-200"
            size="large"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data?.length > 0 ? (
              data?.data?.map((archive: Archive) => (
                <Card key={archive?._id}>
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={archive?.img}
                      alt={archive?.title}
                      width={60}
                      height={60}
                      className="mb-4"
                    />
                    <h3 className="md:text-lg text-base font-semibold mb-4">
                      {archive?.title}
                    </h3>
                    <Button
                      className="gradient-button font-normal !text-white py-2 px-8 rounded-lg"
                      onClick={() => handleClick(archive?._id)}
                    >
                      View all
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Empty
                description="No archives found"
                className="w-full col-span-4"
              />
            )}
          </div>
        </main>
      </div>
    </Spin>
  );
}
