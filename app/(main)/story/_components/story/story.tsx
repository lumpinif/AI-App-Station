import { PostDetails } from "@/types/db_tables"

import { getAuthorProfileById } from "../../_server/data"
import StoryPageWrapper from "../story-page-wrapper"
import { AuthorCard } from "./story-auth-card"
import { StoryTitle } from "./story-title"

type StoryProps = {
  post: PostDetails
}

export const Story: React.FC<StoryProps> = async ({ post }) => {
  const { authorProfile, getAuthorProfileError } = await getAuthorProfileById(
    post.post_author_id
  )

  if (getAuthorProfileError || !authorProfile) {
    console.error("Error getting author profile:", getAuthorProfileError)
    return <div>Error getting author profile</div>
  }

  return (
    <section className="flex w-full flex-col">
      <StoryPageWrapper>
        <StoryTitle post_title={post.post_title} />

        <AuthorCard author={authorProfile} post_created_at={post.created_at} />

        <div className="">Post actions bar here</div>

        <div className="">Post content here</div>
      </StoryPageWrapper>
    </section>
  )
}
