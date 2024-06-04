import { useCallback } from "react"
import { User } from "@supabase/supabase-js"
import _ from "lodash"
import { JSONContent } from "novel"

import {
  Categories,
  Post_Bookmarks,
  Post_likes,
  Posts,
  Profiles,
  Topics,
} from "@/types/db_tables"
import {
  EMPTY_CONTENT_STRING,
  UNTITLED_HEADING,
} from "@/config/editor/editor-config"
import { ContentRenderer } from "@/components/editor/content-renderer"

import { AuthorCard } from "./story-author-card"
import { StoryBookmarkButton } from "./story-bookmark-button"
import { StoryCommentsBadge } from "./story-comments-badge"
import { StoryContentHeader } from "./story-content-header"
import { StoryContentTitle } from "./story-content-title"
import StoryContentWrapper from "./story-content-wrapper"
import { StoryLikeButton } from "./story-like-button"
import { StoryShareButton } from "./story-share-button"
import { StoryTopicsBadge } from "./story-topics-badge"

type StoryEditorContentProps = {
  user: User | null
  topics?: Topics[]
  authorProfile: Profiles
  post_content: JSONContent
  post_likes: Post_likes[]
  post_id: Posts["post_id"]
  post_title: Posts["post_title"]
  created_at: Posts["created_at"]
  post_bookmarks: Post_Bookmarks[]
  postCategories?: Categories[]
  comments_count: Posts["comments_count"]
  post_description: Posts["post_description"]
  post_publish_status: Posts["post_publish_status"]
}

export const StoryEditorContent: React.FC<StoryEditorContentProps> = ({
  user,
  topics,
  post_id,
  post_likes,
  post_title,
  post_content,
  authorProfile,
  post_bookmarks,
  postCategories,
  comments_count,
  post_description,
  post_publish_status,
  created_at: post_created_at,
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
    <StoryContentWrapper>
      {/* POST TITLE */}
      <StoryContentTitle
        post_content={post_content}
        firstHeading={firstHeading}
      />

      <span className="flex flex-col gap-y-2 pb-4">
        {/* TODO: CONSIDER IMPLEMENT THE CATEGORIES LATER */}
        {/* POST CATEGORIES
          <StoryPostCategories postCategories={postCategories} /> */}

        {/* TOPICS BADGE */}
        <StoryTopicsBadge topics={topics} />
        {/* POST DESCRIPTION */}
        {post_description ? (
          <span className="text-sm italic text-muted-foreground">
            {post_description} Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Ut rerum maxime eligendi sequi, odit mollitia
            delectus eos. Commodi reiciendis repellat ex id nulla. Itaque at
            reiciendis culpa quae aperiam cupiditate!
          </span>
        ) : null}
      </span>

      {/* POST HEADER */}
      <StoryContentHeader>
        <AuthorCard
          author={authorProfile}
          post_created_at={post_created_at}
        ></AuthorCard>
        <span className="flex items-center gap-x-2 md:gap-x-4">
          <StoryCommentsBadge
            post_id={post_id}
            profile={authorProfile}
            comments_count={comments_count}
          />
          <StoryLikeButton user={user} post_id={post_id} data={post_likes} />
          <StoryBookmarkButton
            user={user}
            post_id={post_id}
            data={post_bookmarks}
          />
          <StoryShareButton post_title={post_title} author={authorProfile} />
        </span>
      </StoryContentHeader>

      {/* POST CONTENT */}
      {!isEmpty && restContent.content.length > 0 ? (
        <ContentRenderer content={restContent}></ContentRenderer>
      ) : (
        <div className="relative mt-10 w-full">
          <span className="italic text-muted-foreground">
            Story content is empty ...
          </span>
        </div>
      )}
    </StoryContentWrapper>
  )
}
