"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Categories, Posts, Topics } from "@/types/db_tables"
import { Button, ButtonProps } from "@/components/ui/button"
import { ResponsiveModalClose } from "@/components/ui/responsive-modal"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

import { StoryPublishDetailsForm } from "./story-publish-details-form"

type StoryPublishModalProps = ButtonProps & {
  topics?: Topics[]
  postTitle: string
  post_id: Posts["post_id"]
  postCategories?: Categories[]
  postImagesPublicUrls: string[]
  allCategories?: Categories[] | null
  post_image_src: Posts["post_image_src"]
  post_author_id: Posts["post_author_id"]
  post_description: Posts["post_description"]
}

export const StoryPublishModal: React.FC<StoryPublishModalProps> = ({
  topics,
  post_id,
  postTitle,
  allCategories,
  postCategories,
  post_author_id,
  post_image_src,
  post_description,
  postImagesPublicUrls,
  ...props
}) => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  return (
    <>
      <ResponsiveContentModal
        title={`Publish ${postTitle.toUpperCase()}`}
        drawerHeight="h-[98%]"
        isOpen={isPublishModalOpen}
        shouldScaleBackground={true}
        withDefaultDialogClose={false}
        onChange={setIsPublishModalOpen}
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
            topics={topics}
            post_id={post_id}
            postTitle={postTitle}
            allCategories={allCategories}
            post_image_src={post_image_src}
            postCategories={postCategories}
            post_description={post_description}
            postImagesPublicUrls={postImagesPublicUrls}
          />

          {/* TODO: CONSIDER ADD LEARN MORE ABOUT THE STORY USER IS PUBLISHING OR SOME LEGAL STATEMENTS HERE */}
          {/* <div>
                Learn more about what happens to your post when you publish.
              </div> */}
        </div>
      </ResponsiveContentModal>

      <Button
        size={"label"}
        variant={"ghost"}
        onClick={() => setIsPublishModalOpen(true)}
        className="rounded-full border px-4 active:scale-[.98] dark:border-0 dark:shadow-outline"
        {...props}
      >
        Publish
      </Button>
    </>
  )
}
