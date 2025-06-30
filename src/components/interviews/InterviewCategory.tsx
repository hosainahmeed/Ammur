'use client';
import { Card, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { useGetAllInterCategoryQuery } from '@/app/provider/Redux/service/interviewApis';

function InterviewCategory() {
  const router = useRouter();
  const { data, isLoading } = useGetAllInterCategoryQuery();

  const handleClick = (id: string) => {
    router.push(`/interviews/${id}`);
  };
  return (
    <Spin spinning={isLoading}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.length > 0 ? (
          data?.data?.map((category: any) => (
            <Card key={category?._id}>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={category?.img}
                  alt={category?.title}
                  width={60}
                  height={60}
                  className="mb-4"
                />
                <h3 className="text-blue-800 text-lg font-semibold mb-4">
                  {category?.title}
                </h3>
                <Button
                  className="gradient-button font-normal !text-white py-2 px-8 rounded-lg"
                  onClick={() => handleClick(category?._id)}
                >
                  View all
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center col-span-4">
            <p className="text-center">No categories found</p>
          </div>
        )}
      </div>
    </Spin>
  );
}

export default InterviewCategory;
