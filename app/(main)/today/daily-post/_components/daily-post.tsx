import { getDailyPost } from "@/server/queries/supabase/stories/fetch_daily_post"

import { IosStyleDailyPostCard } from "./ios-style-daily-post"

type DailyPostProps = {}

export const DailyPost: React.FC<DailyPostProps> = async ({}) => {
  const { post: dailyPost, error: getDailyPostError } = await getDailyPost()

  if (getDailyPostError) {
    return <div>Error fetching daily post, please try again.</div>
  }

  if (!dailyPost) {
    return (
      <div>No daily post found at this time. It should be fixed shortly.</div>
    )
  }

  return (
    <>
      <div
        style={{
          borderRadius: 20,
        }}
        className="flex flex-col gap-y-1"
      >
        <IosStyleDailyPostCard dailyPost={dailyPost} />
      </div>
    </>
  )
}
