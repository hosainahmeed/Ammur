import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, ChevronLeft } from "lucide-react"
import { recipes } from "@/lib/recipesData"

interface RecipePageProps {
    params: {
        id: string
    }
}

export default function RecipePage({ params }: RecipePageProps) {
    const recipe = recipes.find((r) => r.id === params.id)

    if (!recipe) {
        notFound()
    }

    return (
        <main className="container mx-auto py-28 px-4">
            <Link href="/recipes" className="inline-flex items-center mb-6 hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to recipes
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.recipe_name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{recipe.recipe_name}</h1>
                    <p className="text-gray-600 mb-4">{recipe.family_name}</p>

                    <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gray-500" />
                            <span>{recipe.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-gray-500" />
                            <span>{recipe.servings}</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{recipe.recipe_description}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {recipe.ingredients.map((ingredient, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <div className="relative h-28 w-full">
                                        <Image
                                            src={ingredient.image || "/placeholder.svg"}
                                            alt={ingredient.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <CardContent className="">
                                        <p className="text-sm font-medium text-center">{ingredient.name}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
