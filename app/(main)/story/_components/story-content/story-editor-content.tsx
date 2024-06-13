import { useCallback } from "react"
import { User } from "@supabase/supabase-js"
import _ from "lodash"
import moment from "moment"
import { JSONContent } from "novel"

import {
  Categories,
  Post_bookmarks,
  Post_likes,
  Posts,
  Profiles,
  Topics,
} from "@/types/db_tables"
import {
  EMPTY_CONTENT_STRING,
  UNTITLED_HEADING,
} from "@/config/editor/editor-config"
import { Separator } from "@/components/ui/separator"
import { ContentRenderer } from "@/components/editor/content-renderer"

import { StoryActionsDropDown } from "../story-actions-dropdown"
import { AuthorCard } from "../story-author-card"
import { StoryPublishInfo } from "../story-publish-details"
import { StoryTopicsBadge } from "../story-topics-badge"
import StoryContentWrapper from "./story-content-wrapper"

type StoryEditorContentProps = {
  user: User | null
  topics?: Topics[]
  authorProfile: Profiles
  post_content: JSONContent
  post_likes: Post_likes[]
  post_id: Posts["post_id"]
  post_title: Posts["post_title"]
  created_at: Posts["created_at"]
  post_bookmarks: Post_bookmarks[]
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
      {/* <StoryContentTitle
        post_content={post_content}
        firstHeading={firstHeading}
      /> */}
      <div className="flex flex-col gap-y-4">
        <h1 className="page-title-font text-4xl sm:text-5xl">{post_title}</h1>
        <span className="flex flex-col gap-y-2">
          {/* TODO: CONSIDER IMPLEMENT THE CATEGORIES LATER */}
          {/* POST CATEGORIES
            <StoryPostCategories postCategories={postCategories} /> */}
          {/* POST DESCRIPTION */}
          {post_description ? (
            <span className="text-base font-normal text-muted-foreground">
              {post_description}
            </span>
          ) : null}
        </span>
      </div>

      {/* POST HEADER */}
      <section className="flex w-full flex-wrap items-center gap-x-6 gap-y-6">
        {/* Author */}
        <div className="flex flex-col gap-y-2 sm:min-w-60 md:min-w-72">
          <p className="text-xs text-muted-foreground sm:text-sm">Written by</p>
          <AuthorCard
            author={authorProfile}
            post_created_at={post_created_at}
          ></AuthorCard>
        </div>

        <StoryPublishInfo
          post_created_at={post_created_at}
          post_publish_status={post_publish_status}
        />
      </section>

      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-x-4 gap-y-8 sm:flex-row sm:items-end sm:justify-between">
          {/* TOPICS BADGE */}
          <div className="flex flex-col gap-y-2 sm:max-w-md">
            <StoryTopicsBadge topics={topics} />
          </div>

          {/* Actions with drop down */}
          <StoryActionsDropDown
            user={user}
            post_id={post_id}
            post_title={post_title}
            post_likes={post_likes}
            authorProfile={authorProfile}
            post_bookmarks={post_bookmarks}
            comments_count={comments_count}
            post_publish_status={post_publish_status}
          />
        </div>

        {/* Separator */}
        <Separator className="bg-input sm:mt-20" />
      </div>

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
