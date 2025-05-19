'use client';
import { Card } from 'antd';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Image from 'next/image';
import { Category } from '@/lib/types';
import { useRouter } from 'next/navigation';

const categories: Category[] = [
  { title: 'Memorial Stories', icon: '/icons/icons.jpg' },
  { title: 'Honoring Legends', icon: '/icons/icons.jpg' },
  { title: 'Heritage & History', icon: '/icons/icons.jpg' },
  { title: 'In Memoriam', icon: '/icons/icons.jpg' },
  { title: 'Life & Achievements', icon: '/icons/icons.jpg' },
  { title: 'Family Legacy', icon: '/icons/icons.jpg' },
  { title: 'Tribute Messages', icon: '/icons/icons.jpg' },
  { title: 'Legacy Projects', icon: '/icons/icons.jpg' },
];

export default function Legacy() {
  const router = useRouter();

  const handleClick = (title: string) => {
    const slug = title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
    router.push(`/legacy/${slug}`);
  };

  return (
    <div className="py-28">
      <Head>
        <title>Legacy & Tribute</title>
      </Head>
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Legacy & Tribute</h1>
        <p className="text-blue-700 text-sm font-semibold mb-8">All category</p>

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
      </main>
    </div>
  );
}
