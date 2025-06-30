'use client';
import { Card } from 'antd';
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(4)
          .fill(0)
          .map((_, index: number) => (
            <Card loading className="w-full h-48" key={index} />
          ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
      {data?.data?.length > 0 ? (
        data?.data?.map((category: any) => (
          <Card
            className="h-full"
            cover={
              <Image
                src={category?.img}
                alt={category?.title}
                width={100}
                height={100}
                className="mb-4 object-contain h-[100px] w-full"
              />
            }
            key={category?._id}
          >
            <Card.Meta
              title={category?.title}
              description={
                <Button
                  className="gradient-button font-normal !text-white md:py-2 md:px-8 rounded-lg"
                  onClick={() => handleClick(category?._id)}
                >
                  View all
                </Button>
              }
            />
          </Card>
        ))
      ) : (
        <div className="flex items-center justify-center col-span-4">
          <p className="text-center">No categories found</p>
        </div>
      )}
    </div>
  );
}

export default InterviewCategory;
