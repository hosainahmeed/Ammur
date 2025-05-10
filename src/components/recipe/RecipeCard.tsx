import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"
import { Recipe } from "@/lib/types"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.recipe_name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{recipe.recipe_name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{recipe.family_name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{recipe.recipe_description}</p>
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
      </CardContent>
      <CardFooter>
        <Link href={`/recipes/${recipe.id}`} className="w-full">
          <Button variant="default" className="w-full bg-[#072A5E]">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
