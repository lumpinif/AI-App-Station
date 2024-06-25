import { getPostedStories } from "@/server/queries/supabase/stories/table/post-table-services"

import { SearchParams } from "@/types/data-table"
import { postsSearchParamsSchema } from "@/lib/validations"
import { DateRangePicker } from "@/components/shared/date-range-picker"

type UserPageProps = {
  searchParams: SearchParams
}
export default async function DailyPostsPage({ searchParams }: UserPageProps) {
  const search = postsSearchParamsSchema.parse(searchParams)

  const {
    posts: postOfTheDay,
    pageCount,
    totalPostsCount,
  } = await getPostedStories({
    searchParams: search,
    innerTable: {
      table: "post_of_the_day",
    },
  })

  return (
    <>
      <DateRangePicker
        align="start"
        sideOffset={10}
        triggerSize="sm"
        triggerVariant={"outline"}
        PopoverContentClassName="bg-card/70 p-4 backdrop-blur-lg"
        triggerClassName="mr-auto w-64 text-muted-foreground"
      />
      {postOfTheDay.map((post) => post.post_title)}
      <span>Total posts: {postOfTheDay.length}</span>
      <span>Total pageCount:{pageCount}</span>
      <span>Total totalPostsCount:{totalPostsCount}</span>
    </>
  )
}
