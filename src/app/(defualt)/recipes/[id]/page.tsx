'use client';
import Image from 'next/image';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';
import { Alert, Breadcrumb } from 'antd';
import Link from 'next/link';
import { useGetSingleRecipeQuery } from '@/app/provider/Redux/service/recipeApis';
import { MdFamilyRestroom } from 'react-icons/md';
export default function RecipePage({ params }: any) {
  const { data } = useGetSingleRecipeQuery({ id: params.id });
  return (
    <div className="container mx-auto  py-28 px-4">
      <Breadcrumb
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: <Link href="/recipes">Recipes</Link>,
          },
        ]}
      />
      <main className="max-w-3xl mx-auto">
        <div className="shadow rounded-lg overflow-hidden p-2 flex flex-col items-start sm:items-center sm:flex-row-reverse">
          <div className="relative h-48 rounded-lg overflow-hidden w-full">
            <Image
              src={data?.data?.img || '/placeholder.svg'}
              alt={data?.data?.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-2">
            <CardHeader>
              <CardTitle className="text-xl">{data?.data?.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div
                className="text-sm text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: data?.data?.description }}
              />

              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{data?.data?.cookingTime}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{data?.data?.serving}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 !mt-2 text-sm">
                <MdFamilyRestroom className="h-4 w-4 text-gray-500" />
                <span>{data?.data?.familyName}</span>
              </div>
            </CardContent>
          </div>
        </div>
        <Alert
          className="!w-full !my-4"
          message={`This recipe is lovingly crafted by ${
            data?.data?.familyName
          } and takes approximately ${
            data?.data?.cookingTime
          } minutes to prepare. It serves ${data?.data?.serving} ${
            data?.data?.serving > 1 ? 'people' : 'person'
          }.`}
          type="info"
          showIcon={true}
        />
        <div>
          <h1 className="text-2xl font-bold mt-4">Ingredients :</h1>
          {data?.data?.ingredients?.map((ingredient: any, index: any) => (
            <div
              key={index}
              className="overflow-hidden border items-center rounded-2xl justify-between p-3 mt-3 flex flex-row-reverse"
            >
              <div className="w-[80px] h-[80px]">
                <Image
                  src={ingredient?.img || '/placeholder.svg'}
                  alt={ingredient?.name}
                  width={70}
                  height={70}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg text-[#6F6F6F] font-normal">
                {ingredient?.name}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
