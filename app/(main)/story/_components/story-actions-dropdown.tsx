"use client"

import { User } from "@supabase/supabase-js"
import { Ellipsis, FlagTriangleRight, SquarePen } from "lucide-react"

import { Post_bookmarks, Post_likes, Posts, Profiles } from "@/types/db_tables"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReportForm } from "@/components/feedback-report/report-form"

import { StoryBookmarkButton } from "./story-bookmark-button"
import { StoryCommentsBadge } from "./story-comments-badge"
import { StoryEditDialogContent } from "./story-edit-dialog-content"
import { StoryLikeButton } from "./story-like-button"
import { StoryShareButton } from "./story-share-button"

type StoryActionsDropDownProps = {
  user: User | null
  authorProfile: Profiles
  post_likes: Post_likes[]
  post_id: Posts["post_id"]
  post_title: Posts["post_title"]
  post_bookmarks: Post_bookmarks[]
  comments_count: Posts["comments_count"]
  post_publish_status: Posts["post_publish_status"]
}

export const StoryActionsDropDown: React.FC<StoryActionsDropDownProps> = ({
  user,
  post_id,
  post_title,
  post_likes,
  authorProfile,
  post_bookmarks,
  comments_count,
  post_publish_status,
}) => {
  return (
    <span className="flex items-center justify-between gap-x-4">
      <div className="flex items-center gap-x-4">
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
      </div>
      <div className="flex items-center gap-x-4">
        <StoryShareButton author={authorProfile} post_title={post_title} />

        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="cursor-pointer rounded-full text-muted-foreground/70 ring-offset-background transition-all duration-150 ease-in-out hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:text-primary"
              >
                <Ellipsis size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={10}>
                {/* EDIT */}
                {user?.id === authorProfile.user_id ? (
                  <DropdownMenuItem className="text-muted-foreground hover:text-primary">
                    <AlertDialogTrigger className="flex w-full items-center justify-between">
                      Edit
                      <SquarePen className="size-4" aria-hidden="true" />
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                ) : null}
                {/* REPORT */}
                <DropdownMenuItem className="text-muted-foreground hover:text-primary">
                  <DialogTrigger className="flex w-full items-center justify-between">
                    Report
                    <FlagTriangleRight className="size-4" aria-hidden="true" />
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="flex max-w-sm flex-col gap-y-6 rounded-2xl dark:shadow-outline sm:max-w-2xl sm:p-10 sm:px-14">
              <span>
                <h2 className="page-title-font text-2xl sm:text-3xl">
                  Reporting this story
                </h2>
                <p className="text-muted-foreground">
                  Thanks for taking the time to fill out this report! It means a
                  lot!
                </p>
              </span>
              <ReportForm className="my-4" />
            </DialogContent>

            <StoryEditDialogContent
              user={user}
              post_id={post_id}
              post_author_id={authorProfile.user_id}
              post_publish_status={post_publish_status}
            />
          </AlertDialog>
        </Dialog>
      </div>
    </span>
  )
}
