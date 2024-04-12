"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ListFilter } from "lucide-react"

import { Comment } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button"

type CommentListFilterProps = {
  c_order?: "asc" | "desc"
  orderBy?: keyof Comment
  className?: string
}

export const CommentListFilter: React.FC<CommentListFilterProps> = ({
  className,
  c_order,
  orderBy,
}) => {
  return (
    <>
      <div className={cn(className)}>
        <CommentsFilter c_order={c_order} orderBy={orderBy} />
      </div>
    </>
  )
}

const CommentsFilter: React.FC<CommentListFilterProps> = ({
  c_order,
  orderBy,
}) => {
  const [filter, setFilter] = useState<string>(orderBy || "desc")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair

  const updateUrl = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (key === "orderBy") {
      params.set(key, value) // Only setting orderBy
      params.delete("c_order")
    } else {
      params.set("c_order", value) // Setting c_order for Newest and Oldest
      params.delete("orderBy")
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnValueChange = useCallback(
    (newValue: string) => {
      setFilter(newValue)
      if (newValue === "likes_count") {
        updateUrl("orderBy", newValue)
      } else {
        updateUrl("c_order", newValue)
      }
    },
    [updateUrl]
  )

  useEffect(() => {
    // Check if the URL needs to be updated to include default sorting by likes_count
    const currentOrderBy = searchParams.get("orderBy")
    const currentCOrder = searchParams.get("c_order")

    if (!currentOrderBy && !currentCOrder) {
      // If no sorting is specified in the URL, default to orderBy likes_count
      setFilter("likes_count")
      updateUrl("orderBy", "likes_count")
    }
  }, [orderBy, c_order, searchParams, updateUrl])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <Button
          className="flex h-8 items-center space-x-2 rounded-full"
          variant="ghost"
          size="sm"
        >
          <ListFilter className="size-3 text-muted-foreground" />
          <span className="select-none text-xs text-muted-foreground">
            Filter
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="glass-card-background backdrop-blur-lg"
      >
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={handleOnValueChange}
        >
          <DropdownMenuRadioItem value="likes_count">
            Top Comments
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="asc">Oldest</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
