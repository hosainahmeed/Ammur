import { PaginationControl } from '@/components/recipe/PaginationControlProps';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { recipes } from '@/lib/recipesData';

interface HomePageProps {
  searchParams: {
    page?: string;
  };
}

export default function page({ searchParams }: HomePageProps) {
  const page = Number(searchParams.page) || 1;
  const recipesPerPage = 6;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const startIndex = (page - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const paginatedRecipes = recipes.slice(startIndex, endIndex);

  return (
    <main className="container mx-auto py-28 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Family Recipes & Traditions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover cherished family recipes passed down through generations,
          each with its own story and tradition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <PaginationControl currentPage={page} totalPages={totalPages} />
    </main>
  );
}
