import { getPostedStories } from "@/server/queries/supabase/stories/table/post-table-services"

import { SearchParams } from "@/types/data-table"
import { postsSearchParamsSchema } from "@/lib/validations"

type UserPageProps = {
  searchParams: SearchParams
}
export default async function DailyPostsPagePage({
  searchParams,
}: UserPageProps) {
  const search = postsSearchParamsSchema.parse(searchParams)

  const { posts, pageCount, totalPostsCount } = await getPostedStories({
    searchParams: search,
  })

  return (
    <>
      {posts.map((post) => post.post_title)}
      <span>Total posts: {posts.length}</span>
      <span>Total pageCount:{pageCount}</span>
      <span>Total totalPostsCount:{totalPostsCount}</span>
    </>
  )
}
