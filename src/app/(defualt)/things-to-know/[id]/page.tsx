'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Breadcrumb, Card } from 'antd';
import { Blog } from '@/lib/types';
import Link from 'next/link';

const blogs: Blog[] = [
  {
    title: 'What Failure Taught Me About Success',
    imageUrl: '/images/failure-success.jpg',
    date: '10 Apr 2025',
    author: 'A Murphy',
    summary: 'Sometimes, falling short is exactly what propels us forward...',
    slug: 'what-failure-taught-me-about-success',
  },
  {
    title: 'The Power of Saying No',
    imageUrl: '/images/saying-no.jpg',
    date: '10 Apr 2025',
    author: 'A Murphy',
    summary: 'Sometimes, saying no is the hardest decision to make...',
    slug: 'the-power-of-saying-no',
  },
  {
    title: "Kindness Isn't Weakness—It's Strength",
    imageUrl: '/images/kindness-strength.jpg',
    date: '10 Apr 2025',
    author: 'A Murphy',
    summary: 'Kindness is often misunderstood as a form of weakness...',
    slug: 'kindness-isnt-weakness-its-strength',
  },
];

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const handleCardClick = (slug: string) => {
    router.push(`/things-to-know/${id}/${slug}`);
  };

  return (
    <div className="px-2 py-28">
      <div className="mx-auto container">
        <Breadcrumb
          items={[
            {
              title: <Link href="/things-to-know">Things to know</Link>,
            },
            {
              title: <Link href="">{id}</Link>,
            },
          ]}
        />
        <h1 className="text-3xl font-bold mb-2">Category: {id}</h1>
        <p className="text-blue-700 text-sm font-semibold mb-8">All blogs</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.slug}
              className="flex flex-col"
              cover={
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  width={300}
                  height={200}
                />
              }
            >
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-blue-800 font-medium mb-4">{blog.title}</h3>
                <p className="text-gray-500 mb-4">{blog.summary}</p>
                <Button
                  onClick={() => handleCardClick(blog.slug)}
                  className="gradient-button font-normal text-white py-2 px-8 rounded-lg"
                >
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
