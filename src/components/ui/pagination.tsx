"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Dispatch, SetStateAction } from "react"

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: Dispatch<SetStateAction<number>> | ((page: number) => void)
  maxPageButtons?: number
}

export default function Pagination({ currentPage, totalPages, onPageChange, maxPageButtons = 5 }: PaginationProps) {

  if (totalPages <= 1) return null


  const getPageRange = () => {

    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }


    let start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
    let end = start + maxPageButtons - 1


    if (end > totalPages) {
      end = totalPages
      start = Math.max(1, end - maxPageButtons + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const pageRange = getPageRange()

  return (
    <nav className="flex items-center space-x-1" aria-label="Pagination">
      {/* Previous page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="h-9 w-9"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* First page button with ellipsis if needed */}
      {pageRange[0] > 1 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            aria-label="Go to page 1"
            className={cn("h-9 w-9", currentPage === 1 && "bg-primary text-primary-foreground")}
          >
            1
          </Button>
          {pageRange[0] > 2 && <span className="mx-1 text-gray-500">...</span>}
        </>
      )}

      {/* Page buttons */}
      {pageRange.map((page) => (
        <Button
          key={page}
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page)}
          aria-label={`Go to page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
          className={cn("h-9 w-9", currentPage === page && "bg-primary text-primary-foreground")}
        >
          {page}
        </Button>
      ))}

      {/* Last page button with ellipsis if needed */}
      {pageRange[pageRange.length - 1] < totalPages && (
        <>
          {pageRange[pageRange.length - 1] < totalPages - 1 && <span className="mx-1 text-gray-500">...</span>}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            aria-label={`Go to page ${totalPages}`}
            className={cn("h-9 w-9", currentPage === totalPages && "bg-primary text-primary-foreground")}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next page button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="h-9 w-9"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
