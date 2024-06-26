"use client"

import { useCallback } from "react"
import * as z from "zod"

import { postsSearchParamsSchema } from "@/lib/validations"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type DailyPostsPaginationProps = {
  pageCount: number
  totalCount: number
  searchParams: z.infer<typeof postsSearchParamsSchema>
}

export const DailyPostsPagination: React.FC<DailyPostsPaginationProps> = ({
  pageCount,
  totalCount,
  searchParams,
}) => {
  const currentPage = Number(searchParams.page) || 1
  const pageSize = Number(searchParams.per_page) || 10
  const totalPages = Math.ceil(totalCount / pageSize)

  const createPageUrl = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams as any)
      params.set("page", pageNumber.toString())
      return `?${params.toString()}`
    },
    [searchParams]
  ) // Dependency array

  if (totalPages <= 1) {
    return null // Hide pagination if there is only one page or no items
  }

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="text-muted-foreground hover:text-primary">
            <PaginationPrevious
              href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(pageCount)].map((_, index) => {
            const pageNumber = index + 1
            if (
              pageNumber === 1 ||
              pageNumber === pageCount ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={createPageUrl(pageNumber)}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }
            return null
          })}
          <PaginationItem className="text-muted-foreground hover:text-primary">
            <PaginationNext
              href={
                currentPage < pageCount ? createPageUrl(currentPage + 1) : "#"
              }
              aria-disabled={currentPage === pageCount}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
