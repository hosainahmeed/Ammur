'use client';
import { Category } from '@/lib/types';
import { Card } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
const categories: Category[] = [
  { id: '3568678', title: 'Life Lessons & Values', icon: '/icons/icons.jpg' },
  { id: '678343', title: 'Family & Relationships', icon: '/icons/icons.jpg' },
  { id: '36783', title: 'Spirituality & Beliefs', icon: '/icons/icons.jpg' },
  { id: '365', title: 'Career & Money', icon: '/icons/icons.jpg' },
  { id: '334346', title: 'Career & Money', icon: '/icons/icons.jpg' },
  { id: '12354634', title: 'Life Lessons & Values', icon: '/icons/icons.jpg' },
  { id: '35663346', title: 'Family & Relationships', icon: '/icons/icons.jpg' },
  { id: '12336456', title: 'Spirituality & Beliefs', icon: '/icons/icons.jpg' },
];
function InterviewCategory() {
  const router = useRouter();

  const handleClick = (title: string) => {
    const slug = title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
    router.push(`/interviews/${slug}`);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <Card key={index}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={category.icon}
              alt={category.title}
              width={60}
              height={60}
              className="mb-4"
            />
            <h3 className="text-blue-800 text-lg font-semibold mb-4">
              {category.title}
            </h3>
            <Button
              className="gradient-button font-normal !text-white py-2 px-8 rounded-lg"
              onClick={() => handleClick(category.title)}
            >
              View all
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default InterviewCategory;
