import { JSONContent } from "novel"

import { PostDetails } from "@/types/db_tables"

import { getAuthorProfileById } from "../../../user/stories/[post_id]/data"
import StoryPageWrapper from "../story-page-wrapper"
import { StoryEditorContent } from "./story-editor-content"

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
        <StoryEditorContent
          post_content={post.post_content as JSONContent}
          authorProfile={authorProfile}
          created_at={post.created_at}
        />
      </StoryPageWrapper>
    </section>
  )
}
