"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Posts, Topics } from "@/types/db_tables"
import { Button } from "@/components/ui/button"
import { ResponsiveModalClose } from "@/components/ui/responsive-modal"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

import { StoryPublishDetailsForm } from "./story-publish-details-form"
import { StoryPublishHeader } from "./story-publish-header"
import { StoryPublishPreview } from "./story-publish-preview"

type StoryPublishModalProps = {
  topics?: Topics[]
  postTitle: string
  post_id: Posts["post_id"]
  post_description: Posts["post_description"]
}

export const StoryPublishModal: React.FC<StoryPublishModalProps> = ({
  topics,
  post_id,
  postTitle,
  post_description,
}) => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  return (
    <>
      <ResponsiveContentModal
        title="Account"
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

          <section className="grid gap-6 p-2 sm:grid-cols-2 sm:gap-10">
            {/* Left side */}
            <div className="flex flex-col gap-y-6">
              <StoryPublishPreview />
            </div>

            {/* Right side */}
            <div className="flex flex-col justify-between">
              <div className="flex h-full flex-col justify-between gap-y-4">
                <StoryPublishHeader postTitle={postTitle} />

                <StoryPublishDetailsForm
                  topics={topics}
                  post_id={post_id}
                  post_description={post_description}
                />
              </div>

              {/* TODO: CONSIDER ADD LEARN MORE ABOUT THE STORY USER IS PUBLISHING OR SOME LEGAL STATEMENTS HERE */}
              {/* <div>
                Learn more about what happens to your post when you publish.
              </div> */}
            </div>
          </section>
        </div>
      </ResponsiveContentModal>

      <Button
        size={"label"}
        variant={"ghost"}
        onClick={() => setIsPublishModalOpen(true)}
        className="rounded-full border px-4 active:scale-[.98] dark:border-0 dark:shadow-outline"
      >
        Publish
      </Button>
    </>
  )
}
