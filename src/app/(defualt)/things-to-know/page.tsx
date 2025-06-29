'use client';
import { Card, Spin } from 'antd';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGetThingsToKnowQuery } from '@/app/provider/Redux/service/thingsToKnowApis';

export type Category = {
  _id: string;
  title: string;
  img: string;
};


export default function ThingsToKnow() {
  const { data, isLoading } = useGetThingsToKnowQuery();
  console.log(data);
  const router = useRouter();
  const handleClick = (category: Category) => {
    router.push(`/things-to-know/${category._id}`);
  };

  return (
    <Spin spinning={isLoading}>
      <div className="my-28 min-h-screen">
        <Head>
          <title>Things to Know</title>
        </Head>
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">Things to know</h1>
          <p className="text-blue-700 text-sm font-semibold mb-8">
            All category
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data?.map((category: Category) => (
              <Card key={category?._id}>
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={category?.img}
                    alt={category?.title}
                    width={60}
                    height={60}
                    className="mb-4 max-w-[60px] max-h-[60px] h-[60px] w-[60px] object-cover"
                  />
                  <h3 className="text-blue-800 text-center text-lg font-semibold mb-4">
                    {category?.title}
                  </h3>
                  <Button
                    className="gradient-button font-normal !text-white py-2 px-8 rounded-lg"
                    onClick={() => handleClick(category)}
                  >
                    View all
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </Spin>
  );
}
