import { getDailyPost } from "@/server/queries/supabase/stories/fetch_daily_post"

import { DEFAULT_POST_IMAGE } from "@/lib/constants/site-constants"
import { getAverageColorOnServer } from "@/lib/get-average-color-on-server"

import { IosStyleDailyPostCard } from "./ios-style-daily-post"

type DailyPostProps = {}

export const DailyPost: React.FC<DailyPostProps> = async ({}) => {
  const { post: dailyPost, error: getDailyPostError } = await getDailyPost()

  if (getDailyPostError) {
    console.error("Error fetching daily post:", getDailyPostError)
    return <ErrorMessage message={getDailyPostError.message} />
  }

  if (!dailyPost) {
    return <NoPostMessage />
  }

  const imageSrc = dailyPost.posts.post_image_src || DEFAULT_POST_IMAGE
  const averageColor = await getAverageColorOnServer(imageSrc)

  return (
    <>
      <div
        style={{
          borderRadius: 20,
        }}
        className="flex flex-col gap-y-1"
      >
        <IosStyleDailyPostCard
          dailyPost={dailyPost}
          averageColor={averageColor}
        />
      </div>
    </>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div>Error fetching daily post, please try again. Error: {message}</div>
  )
}

function NoPostMessage() {
  return (
    <div>No daily post found at this time. It should be fixed shortly.</div>
  )
}
