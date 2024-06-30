"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Categories, PostDetails } from "@/types/db_tables"
import { Button, ButtonProps } from "@/components/ui/button"
import { ResponsiveModalClose } from "@/components/ui/responsive-modal"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

import { StoryPublishDetailsForm } from "./story-publish-details-form"

type StoryPublishModalProps = ButtonProps & {
  post: PostDetails
  isEmpty?: boolean
  isEdited?: boolean
  saveStatus: string
  isRetrying: boolean
  currentTitle: string
  postImagesPublicUrls: string[]
  allCategories?: Categories[] | null
}

export const StoryPublishModal: React.FC<StoryPublishModalProps> = ({
  post,
  isEmpty,
  isEdited,
  saveStatus,
  isRetrying,
  currentTitle,
  allCategories,
  postImagesPublicUrls,
  ...props
}) => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  const { post_publish_status } = post

  const draft = post_publish_status === "draft"
  const pending = post_publish_status === "pending"
  const published = post_publish_status === "published"
  const unpublished = post_publish_status === "unpublished"

  const buttonLabel = published
    ? "Published"
    : draft
      ? "Draft"
      : pending
        ? "Pending"
        : "Unpublished"

  return (
    <TooltipProvider>
      <ResponsiveContentModal
        drawerHeight="h-[98%]"
        isOpen={isPublishModalOpen}
        shouldScaleBackground={true}
        withDefaultDialogClose={false}
        onChange={setIsPublishModalOpen}
        title={`Publish ${currentTitle.toUpperCase()}`}
        drawerContentClassName="outline-none rounded-t-3xl"
        dialogContentClassName="w-full max-w-full h-full border-0 outline-none"
      >
        <div className="container mx-auto my-auto max-sm:pb-14">
          <div className="flex w-full justify-end">
            <ResponsiveModalClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground max-sm:hidden">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </ResponsiveModalClose>
          </div>

          <StoryPublishDetailsForm
            post={post}
            currentTitle={currentTitle}
            allCategories={allCategories}
            postImagesPublicUrls={postImagesPublicUrls}
          />

          {/* TODO: CONSIDER ADD LEARN MORE ABOUT THE STORY USER IS PUBLISHING OR SOME LEGAL STATEMENTS HERE */}
          {/* <div>
                Learn more about what happens to your post when you publish.
              </div> */}
        </div>
      </ResponsiveContentModal>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size={"label"}
            variant={"ghost"}
            onClick={() => setIsPublishModalOpen(true)}
            className="rounded-full border px-4 active:scale-[.98] dark:border-0 dark:shadow-outline"
            disabled={
              saveStatus === "saving" || isRetrying || isEmpty || !isEdited
            }
            {...props}
          >
            {!isEdited
              ? buttonLabel
              : post_publish_status === "published"
                ? "Publish Changes"
                : "Publish"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {!isEdited
            ? "Make some changes to publish"
            : "Publish your story to make it live"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
