import { Suspense } from "react"
import { getPostedStories } from "@/server/queries/supabase/stories/table/post-table-services"

import { SearchParams } from "@/types/data-table"
import { postsSearchParamsSchema } from "@/lib/validations"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/shared/date-range-picker"

import { PostedStoriesTable } from "./_components/table/posted-stories-table"

type UserPageProps = {
  searchParams: SearchParams
}

export default async function UserStoriesPage({ searchParams }: UserPageProps) {
  const search = postsSearchParamsSchema.parse(searchParams)

  const { posts, pageCount, totalPostsCount } = await getPostedStories({
    searchParams: search,
  })

  return (
    <main>
      <DateRangePicker
        align="start"
        className="p-1"
        sideOffset={10}
        triggerSize="sm"
        triggerVariant={"outline"}
        PopoverContentClassName="bg-card/70 p-4 backdrop-blur-lg"
        triggerClassName="mr-auto w-64 text-muted-foreground"
      />

      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={6}
            searchableColumnCount={1}
            filterableColumnCount={1}
            cellWidths={["25rem", "10rem", "10rem", "8rem", "8rem", "5rem"]}
            shrinkZero
          />
        }
      >
        <PostedStoriesTable
          posts={posts}
          pageCount={pageCount}
          totalPostsCount={totalPostsCount}
        />
      </Suspense>
    </main>
  )
}
