'use client';

import { useGetSingleSubCategoryQuery } from '@/app/provider/Redux/service/thingsToKnowApis';
import { Alert, Breadcrumb } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const { data } = useGetSingleSubCategoryQuery({ id: slug as string });
  return (
    <div className="py-28">
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
          className="w-full h-[600px] object-cover mb-8"
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
