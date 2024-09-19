import { getPostedStories } from "@/server/queries/supabase/stories/table/post-table-services"
import { User } from "@supabase/supabase-js"
import * as z from "zod"

import { Profiles } from "@/types/db_tables"
import { postsSearchParamsSchema } from "@/lib/validations"
import { StoryCard } from "@/components/cards/apps/stories/story-card"

import { DailyPostsPagination } from "./daily-posts-pagination"
import DPAnalyticsCards from "./dp-analytics-cards"

type DailyPostsCardsGridProps = {
  profile: Profiles
  searchParams: z.infer<typeof postsSearchParamsSchema>
}

export const DailyPostsCardsGrid: React.FC<DailyPostsCardsGridProps> = async ({
  profile,
  searchParams,
}) => {
  const user_id = profile?.user_id
  const profile_role = profile?.profile_role?.role

  const {
    pageCount,
    totalPostsCount,
    posts: postOfTheDay,
  } = await getPostedStories({
    searchParams: searchParams,
    innerTable: {
      table: "daily_post",
    },
  })

  return (
    <div className="mt-6 flex flex-col gap-y-4 sm:gap-y-6 xl:gap-y-8">
      <section className="w-full rounded-xl">
        <DPAnalyticsCards
          total={totalPostsCount}
          profile_role={profile_role}
          className="grid auto-rows-max grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 xl:grid-cols-6 xl:gap-8"
        />
      </section>

      <div className="grid auto-rows-max grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-8">
        {postOfTheDay.map((post) => {
          if (!post) return null // Type guard to handle potential null values
          return <StoryCard post={post} user_id={user_id} key={post.post_id} />
        })}
      </div>

      <DailyPostsPagination
        pageCount={pageCount}
        totalCount={totalPostsCount}
        searchParams={searchParams}
      />
    </div>
  )
}
