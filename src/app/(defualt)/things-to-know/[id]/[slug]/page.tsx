'use client';

import { Breadcrumb } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IblogDetail {
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
}

interface IblogDetails {
  [slug: string]: IblogDetail;
}

const blogDetails: IblogDetails = {
  'what-failure-taught-me-about-success': {
    title: 'What Failure Taught Me About Success',
    content: `Failure is often seen as something to fear or avoid—but what if we told you it's one of the most valuable tools for growth?`,
    imageUrl: '/5999330.jpg',
    date: '10 Apr 2025',
    author: 'A Murphy',
  },
  'the-power-of-saying-no': {
    title: 'The Power of Saying No',
    content: `Sometimes, saying no is the hardest decision to make. However, learning to say no is one of the most liberating experiences...`,
    imageUrl: '/5999330.jpg',
    date: '10 Apr 2025',
    author: 'A Murphy',
  },
  'kindness-isnt-weakness-its-strength': {
    title: "Kindness Isn't Weakness—It's Strength",
    content: `Kindness is often misunderstood as a form of weakness. But the truth is, kindness is one of the strongest forces in the world...`,
    imageUrl: '/5999330.jpg',
    date: '10 Apr 2025',
    author: 'A Murphy',
  },
};

export default function BlogDetailPage() {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  console.log(slug);
  const [blog, setBlog] = useState<IblogDetail | null>(null);
  useEffect(() => {
    if (slug && blogDetails[slug]) {
      setBlog(blogDetails[slug]);
    }
  }, [slug]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="py-28">
      <div className="container mx-auto px-4 ">
        <Breadcrumb
          items={[
            {
              title: <Link href="/things-to-know">Things to know</Link>,
            },
            {
              title: <Link href={`/things-to-know/${id}`}>{id}</Link>,
            },
            {
              title: <Link href="">{slug}</Link>,
            },
          ]}
        />
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">
          {blog.author} - {blog.date}
        </p>
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-auto mb-8"
          width={1200}
          height={800}
        />
        <div className="prose">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}
