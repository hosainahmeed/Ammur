import Image from 'next/image';
import Link from 'next/link';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '@/lib/types';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="shadow rounded-lg overflow-hidden p-2 flex justify-between gap-3 flex-col items-center sm:flex-row-reverse">
      <div className="relative h-48 rounded-lg overflow-hidden w-56 min-w-56">
        <Image
          src={recipe.image || '/placeholder.svg'}
          alt={recipe.recipe_name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div>
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
        <CardFooter>
          <Link href={`/recipes/${recipe.id}`} className="!w-fit">
            <Button variant="default" className="!w-fit gradient-button !mt-3">
              View Ingredients
            </Button>
          </Link>
        </CardFooter>
      </div>
    </div>
  );
}
