import React from "react"
import Link from "next/link"
import { BarChart2, Heart, MessageCircle, Share } from "lucide-react"
import moment from "moment"

import {
  CommentType,
  CommentWithProfile,
  CommentWithReplies,
} from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import { Icons } from "../icons/icons"

// TODO: ADD COMMENTDELETEBUTTON <CommentDeleteButton id={id} userId={userId} />

// Component to list comments
const CommentList: React.FC<{ comments: CommentWithProfile[] }> = ({
  comments,
}) => {
  const organizedComments = React.useMemo(() => {
    const commentsMap = new Map<string, CommentWithReplies>()

    // Initialize commentMap with all comments
    comments.forEach((comment) => {
      commentsMap.set(comment.comment_id, { ...comment, replies: [] })
    })

    // Helper function to recursively add replies to their parent comment
    const addRepliesToParent = (comment: CommentWithProfile) => {
      const parentComment = commentsMap.get(comment.reply_to!)
      if (parentComment) {
        const commentWithReplies: CommentWithReplies = {
          ...comment,
          replies: [],
        }
        if (!parentComment.replies) {
          parentComment.replies = []
        }
        parentComment.replies.push(commentWithReplies)
        addRepliesToChildren(commentWithReplies)
      }
    }

    // Helper function to recursively add replies to a comment
    const addRepliesToChildren = (comment: CommentWithReplies) => {
      comments.forEach((childComment) => {
        if (childComment.reply_to === comment.comment_id) {
          const childCommentWithReplies: CommentWithReplies = {
            ...childComment,
            replies: [],
          }
          if (!comment.replies) {
            comment.replies = []
          }
          comment.replies.push(childCommentWithReplies)
          addRepliesToChildren(childCommentWithReplies)
        }
      })
    }

    // Iterate over all comments and nest them if they have a reply_to
    comments.forEach((comment) => {
      if (comment.reply_to) {
        addRepliesToParent(comment)
      }
    })

    // Filter out top-level comments (those without a reply_to)
    return Array.from(commentsMap.values()).filter(
      (comment) => !comment.reply_to
    )
  }, [comments])

  console.log(JSON.stringify(organizedComments, null, 2))

  return (
    <div>
      {organizedComments.map((comment) => (
        <CommentItem key={comment.comment_id} {...comment} />
      ))}
    </div>
  )
}

// Individual comment item component
const CommentItem: React.FC<CommentWithReplies> = ({
  comment,
  comment_id,
  created_at,
  profiles,
  user_id,
  replies = [],
}) => {
  const replyElements = React.useMemo(
    () =>
      replies.map(
        (reply) => <CommentItem key={reply.comment_id} {...reply} /> // Ensure replies to replies are passed down
      ),
    [replies]
  )

  const isParentComment = replyElements && replyElements.length > 0

  return (
    <>
      <div className="flex flex-col">
        <Comment
          comment={comment}
          comment_id={comment_id}
          created_at={created_at}
          user_id={user_id}
          display_name={profiles.display_name}
          avatar_url={profiles.avatar_url}
          isParentComment={isParentComment}
        />
        {replyElements.length > 0 && (
          <div className="">
            {/* Adjust top margin as needed */}
            {replyElements}
          </div>
        )}
        {!isParentComment && <Separator className="my-2" />}
      </div>
    </>
  )
}

const Comment: React.FC<CommentType> = ({
  comment_id,
  user_id,
  display_name,
  avatar_url,
  comment,
  created_at,
  isParentComment,
}) => {
  return (
    <div
      className="flex gap-x-4 rounded-lg p-4 hover:bg-muted/10"
      id={comment_id}
    >
      <div className="relative shrink-0 ">
        {isParentComment && (
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
        <CommentActions />
      </div>
    </div>
  )
}

const CommentActions = () => {
  return (
    <div className="flex items-center justify-between">
      <span className="group rounded-full p-2 hover:bg-blue-500/10">
        <MessageCircle
          className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-blue-500 "
          size={20}
        />
      </span>
      <span className="group rounded-full p-2 hover:bg-rose-500/10">
        <Heart
          className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-rose-500 "
          size={20}
        />
      </span>
      <span className="group rounded-full p-2 hover:bg-purple-500/10">
        <BarChart2
          className="stroke-current stroke-[1.5] text-muted-foreground group-hover:stroke-purple-500 "
          size={20}
        />
      </span>
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
