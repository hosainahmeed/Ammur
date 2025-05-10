"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface PaginationControlProps {
    totalPages: number
}

export function PaginationControl({ totalPages }: PaginationControlProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page") || "1")

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `?${params.toString()}`
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                onClick={() => {
                    if (currentPage > 1) {
                        router.push(createPageURL(currentPage - 1))
                    }
                }}
                disabled={currentPage <= 1}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    onClick={() => router.push(createPageURL(page))}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="outline"
                size="icon"
                onClick={() => {
                    if (currentPage < totalPages) {
                        router.push(createPageURL(currentPage + 1))
                    }
                }}
                disabled={currentPage >= totalPages}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
            </Button>
        </div>
    )
}
