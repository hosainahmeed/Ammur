'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Alert, Breadcrumb, Card } from 'antd';
import Link from 'next/link';
import { useSingleThingsToKnowQuery } from '@/app/provider/Redux/service/thingsToKnowApis';

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { data, isLoading } = useSingleThingsToKnowQuery({ id: id as string });
  const handleCardClick = (blog: any) => {
    router.push(`/things-to-know/${id}/${blog?._id}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto my-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Card className="h-48" loading key={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="px-2 my-28">
      <div className="mx-auto container">
        <Alert
          className="!mb-5"
          message={
            <Breadcrumb
              items={[
                {
                  title: <Link href="/things-to-know">Things to know</Link>,
                },
                {
                  title: (
                    <Link href={`/things-to-know/${id}`}>
                      {data?.data?.title}
                    </Link>
                  ),
                },
              ]}
            />
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.ThingToKnows?.map((blog: any) => (
            <Card
              key={blog?._id}
              className="flex flex-col"
              cover={
                <Image
                  src={blog?.img}
                  alt={blog?.title}
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL={blog?.img}
                  className="object-cover"
                />
              }
            >
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-blue-800 font-medium mb-4">
                  {blog?.title}
                </h3>
                <p
                  className="text-gray-500 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: blog?.description.slice(0, 100) + '...',
                  }}
                />
                <Button
                  onClick={() => handleCardClick(blog)}
                  className="gradient-button font-normal !text-white py-2 px-8 rounded-lg"
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
