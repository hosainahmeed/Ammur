'use client';

import { useGetRecipeQuery } from '@/app/provider/Redux/service/recipeApis';
import { RecipeCard } from '@/components/recipe/RecipeCard';

export default function Page() {
  const { data, isLoading, error } = useGetRecipeQuery();

  return (
    <main className="container mx-auto py-28 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Family Recipes & Traditions</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {data?.data.map((recipe: any) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>

      {/* <PaginationControl currentPage={page} totalPages={totalPages} /> */}
    </main>
  );
}
