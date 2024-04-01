import React from "react"
import Link from "next/link"
import { BarChart2, Heart, MessageCircle, Share } from "lucide-react"
import moment from "moment"

import {
  CommentAction,
  CommentType,
  CommentWithProfileWithChildren,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useReplies } from "@/hooks/react-hooks/use-comments-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import { Icons } from "../icons/icons"

// TODO: ADD COMMENTDELETEBUTTON <CommentDeleteButton id={id} userId={userId} />

// Component to list comments
const CommentList: React.FC<{ comments: CommentWithProfileWithChildren[] }> = ({
  comments,
}) => {
  return (
    <div>
      {comments.map((comment) => (
        <div className="flex flex-col">
          <CommentItem key={comment.comment_id} {...comment} />
          <Separator className="my-2" />
        </div>
      ))}
    </div>
  )
}

// Individual comment item component
const CommentItem: React.FC<CommentWithProfileWithChildren> = ({
  parent_id,
  comment,
  likes_count,
  rating,
  views_count,
  comment_id,
  created_at,
  profiles,
  user_id,
  children = [],
}) => {
  const [showReplies, setShowReplies] = React.useState(false)
  const toggleReplies = () => setShowReplies(!showReplies)

  const replyElements = React.useMemo(
    () =>
      children.map((reply) => (
        <CommentItem key={reply.comment_id} {...reply} />
      )),
    [children]
  )

  const repliesCount = children.length > 0 ? children.length : 0

  return (
    <>
      <div className="relative flex flex-col">
        <Comment
          parent_id={parent_id}
          likes_count={likes_count}
          views_count={views_count}
          rating={rating}
          comment={comment}
          comment_id={comment_id}
          created_at={created_at}
          user_id={user_id}
          display_name={profiles.display_name}
          avatar_url={profiles.avatar_url}
          isReplied={children.length > 0}
          toggleReplies={toggleReplies}
          showReplies={showReplies}
          repliesCount={repliesCount}
        />
        {showReplies && <div>{replyElements}</div>}
      </div>
    </>
  )
}

export const Comment: React.FC<CommentType> = ({
  parent_id,
  likes_count,
  rating,
  views_count,
  comment_id,
  user_id,
  display_name,
  avatar_url,
  comment,
  created_at,
  isReplied,
  toggleReplies,
  showReplies,
  repliesCount,
}) => {
  return (
    <div
      className="flex gap-x-4 rounded-lg p-4 hover:bg-muted/10"
      id={comment_id}
    >
      <div className="relative shrink-0 ">
        {isReplied && showReplies && (
          <span className="absolute left-1/2 right-1/2 top-11 h-[calc(100%-1rem)] w-0.5 translate-x-[0.5px] border-l" />
        )}
        <Avatar>
          <AvatarImage
            src={avatar_url as string}
            alt="Avatar"
            className="animate-fade rounded-full"
          />
          <AvatarFallback>
            <span className="flex h-full w-full items-center justify-center bg-muted">
              <Icons.user
                className={cn(
                  "h-[calc(75%)] w-[calc(75%)] animate-fade rounded-full text-muted-foreground"
                )}
              />
            </span>
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-1">
            <h4 className="font-bold">
              {display_name ? display_name : `user_${user_id.slice(-5)}`}
            </h4>
            <span className="ml-2 text-sm text-muted-foreground">
              <Link href={""} className="hover:underline">
                @{display_name ? display_name : `user_${user_id.slice(-5)}`}
              </Link>
            </span>
            <span className="h-[2px] w-[2px] rounded-full bg-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {moment(created_at).fromNow()}
            </span>
          </div>
          <div className="prose text-primary">{comment}</div>
        </div>
        <CommentActions
          toggleReplies={toggleReplies}
          showReplies={showReplies}
          isReplied={isReplied}
          repliesCount={repliesCount}
          likes_count={likes_count}
          rating={rating}
          views_count={views_count}
        />
      </div>
    </div>
  )
}

const CommentActions: React.FC<CommentAction> = ({
  toggleReplies,
  showReplies,
  isReplied,
  repliesCount,
  likes_count,
  rating,
  views_count,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-1">
        <span className="group rounded-full p-2 hover:bg-blue-500/10">
          <MessageCircle
            className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-blue-500 "
            size={20}
          />
        </span>
        {isReplied && (
          <div
            onClick={toggleReplies}
            className={cn(
              "mt-1 w-fit cursor-pointer text-xs text-muted-foreground hover:text-primary",
              showReplies ? "text-primary" : ""
            )}
          >
            {showReplies
              ? `Hide ${repliesCount} replies`
              : `Show ${repliesCount} replies`}
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-1">
        <span className="group rounded-full p-2 hover:bg-rose-500/10">
          <Heart
            className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-rose-500 "
            size={20}
          />
        </span>
        {likes_count && (
          <span className="text-xs text-muted-foreground">{likes_count}</span>
        )}
      </div>
      <div className="flex items-center gap-x-1">
        <span className="group rounded-full p-2 hover:bg-purple-500/10">
          <BarChart2
            className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-purple-500 "
            size={20}
          />
        </span>
        {views_count && (
          <span className="mt-1 text-xs text-muted-foreground">
            {views_count}
          </span>
        )}
      </div>
      <span className="group rounded-full p-2 hover:bg-green-500/10">
        <Share
          className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-green-500 "
          size={20}
        />
      </span>
    </div>
  )
}

export default CommentList
