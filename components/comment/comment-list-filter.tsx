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
  const [isClient, setIsClient] = useState(false)
  const [filter, setFilter] = useState<string | undefined>(
    c_order || orderBy || "likes_count"
  )
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair

  const updateUrl = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (key === "c_order") {
        params.set("c_order", value) // Setting c_order for Newest and Oldest
        params.delete("orderBy")
      } else {
        params.set(key, value) // Only setting orderBy
        params.delete("c_order")
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const handleOnValueChange = (newValue: string) => {
    setFilter(newValue)
    if (newValue === "desc" || newValue === "asc") {
      updateUrl("c_order", newValue)
    } else {
      updateUrl("orderBy", newValue)
    }
  }

  return (
    isClient && (
      <div className={cn(className)}>
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
              <DropdownMenuRadioItem value="updated_at">
                Recently Updated
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="rating">
                Rating
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  )
}
