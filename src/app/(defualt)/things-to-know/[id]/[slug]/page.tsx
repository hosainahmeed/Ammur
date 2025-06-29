'use client';

import { useGetSingleSubCategoryQuery } from '@/app/provider/Redux/service/thingsToKnowApis';
import { Alert, Breadcrumb, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const { data, isLoading } = useGetSingleSubCategoryQuery({
    id: slug as string,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto my-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} loading className="w-full h-48"></Card>
        ))}
      </div>
    );
  }

  return (
    <div className="my-28">
      <div className="container mx-auto px-1">
        <Alert
          className="!mb-5"
          message={
            <Breadcrumb
              items={[
                {
                  title: <Link href="/things-to-know">Things to know</Link>,
                },
                {
                  title: data?.data?.title,
                },
              ]}
            />
          }
        />
        <h1 className="text-3xl font-bold mb-2">{data?.data?.title}</h1>
        <p className="text-gray-500 mb-4">
          {new Date(data?.data?.createdAt).toLocaleDateString().split('T')[0]}
        </p>
        <Image
          src={data?.data?.img}
          alt={data?.data?.title}
          className="w-full h-auto max-h-[400px] object-contain mb-8"
          width={400}
          height={400}
        />
        <div className="prose">
          <p
            className="mb-4 md:text-xl leading-9"
            dangerouslySetInnerHTML={{ __html: data?.data?.description }}
          />
        </div>
      </div>
    </div>
  );
}
