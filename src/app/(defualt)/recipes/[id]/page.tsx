/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';
import { recipes } from '@/lib/recipesData';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

export default function RecipePage({ params }: any) {
  const recipe = recipes.find((r) => r.id === params.id);

  if (!recipe) {
    notFound();
  }

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
          {
            title: recipe.recipe_name,
          },
        ]}
      />
      <main className="max-w-3xl mx-auto">
        <div className="shadow rounded-lg overflow-hidden p-2 flex flex-col items-start sm:items-center sm:flex-row-reverse">
          <div className="relative h-48 rounded-lg overflow-hidden w-full">
            <Image
              src={recipe.image || '/placeholder.svg'}
              alt={recipe.recipe_name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className='mt-2'>
            <CardHeader>
              <CardTitle className="text-xl">{recipe.recipe_name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-3">
                {recipe.recipe_description}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{recipe.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{recipe.servings}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 !mt-2 text-sm">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{recipe.family_name}</span>
              </div>
            </CardContent>
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold mt-4'>Ingredients :</h1>
          {recipe.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="overflow-hidden border items-center rounded-2xl justify-between p-3 mt-3 flex flex-row-reverse"
            >
              <div className="w-[80px] h-[80px]">
                <Image
                  src={ingredient.image || '/placeholder.svg'}
                  alt={ingredient.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg text-[#6F6F6F] font-normal">
                {ingredient.name}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
