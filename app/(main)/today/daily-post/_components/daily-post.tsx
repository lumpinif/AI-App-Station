import { getDailyPost } from "@/server/queries/supabase/stories/fetch_daily_post"

import { IosStyleDailyPostCard } from "./ios-style-daily-post"

const fetchDailyPost = async () => {
  try {
    const { post: dailyPost, error: getDailyPostError } = await getDailyPost()

    if (getDailyPostError) {
      console.error(`Error fetching daily post: ${getDailyPostError.message}`)
      return { dailyPost: null, error: getDailyPostError }
    }

    return { dailyPost, error: getDailyPostError }
  } catch (error) {
    console.error(`Unexpected error fetching daily post: ${error}`)
    return { dailyPost: null, error }
  }
}

type DailyPostProps = {}

export const DailyPost: React.FC<DailyPostProps> = async ({}) => {
  const { dailyPost, error } = await fetchDailyPost()

  if (error) {
    return <div>Error fetching daily post, please try again.</div>
  }

  if (!dailyPost) {
    return (
      <div>No daily post found at this time. It should be fixed shortly.</div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <IosStyleDailyPostCard dailyPost={dailyPost} />
      </div>
    </>
  )
}
