import { useCallback } from "react"
import _ from "lodash"
import { JSONContent } from "novel"

import { Posts, Profiles } from "@/types/db_tables"
import {
  EMPTY_CONTENT_STRING,
  UNTITLED_HEADING,
} from "@/config/editor/editor-config"
import { ContentRenderer } from "@/components/editor/content-renderer"

import { AuthorCard } from "./story-auth-card"
import { StoryContentTitle } from "./story-content-title"

type StoryEditorContentProps = {
  post_content: JSONContent
  authorProfile: Profiles
  created_at: Posts["created_at"]
}

export const StoryEditorContent: React.FC<StoryEditorContentProps> = ({
  post_content,
  created_at: post_created_at,
  authorProfile,
}) => {
  const isContentEmpty = useCallback((content: JSONContent) => {
    return content === null || _.isEqual(content, EMPTY_CONTENT_STRING)
  }, [])

  const isEmpty = isContentEmpty(post_content)

  const firstHeading =
    post_content?.content?.find((node: any) => node.type === "heading") ??
    UNTITLED_HEADING

  const rest =
    post_content?.content?.filter((node: any) => node !== firstHeading) ?? []

  const restContent = {
    type: "doc",
    content: rest,
  }

  return (
    <section className="mb-10 pb-10">
      <StoryContentTitle
        post_content={post_content}
        firstHeading={firstHeading}
      />
      <AuthorCard author={authorProfile} post_created_at={post_created_at} />
      {!isEmpty && restContent.content.length > 0 ? (
        <ContentRenderer content={restContent}></ContentRenderer>
      ) : (
        <div className="relative mt-10 w-full">
          <span className="text-muted-foreground italic">
            Story content is empty ...
          </span>
        </div>
      )}
    </section>
  )
}
