import { JSONContent } from "novel"

import { PostDetails } from "@/types/db_tables"

import StoryPageWrapper from "../story-page-wrapper"
import { StoryEditorContent } from "./story-editor-content"

type StoryProps = {
  post: PostDetails
}

export const Story: React.FC<StoryProps> = async ({ post }) => {
  return (
    <section className="flex w-full flex-col">
      <StoryPageWrapper>
        <StoryEditorContent
          post_content={post.post_content as JSONContent}
          authorProfile={post.profiles}
          created_at={post.created_at}
        />
      </StoryPageWrapper>
    </section>
  )
}
