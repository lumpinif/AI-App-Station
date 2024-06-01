"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"

import { inputVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { AutosizeTextarea } from "@/components/ui/autosize-textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MultipleSelector from "@/components/ui/multiple-selector"
import { ResponsiveModalClose } from "@/components/ui/responsive-modal"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"
import { SpinnerButton } from "@/components/shared/spinner-button"

type StoryPublishModalProps = {}

export const StoryPublishModal: React.FC<StoryPublishModalProps> = ({}) => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

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
        <div className="container mx-auto my-auto">
          <div className="flex w-full justify-end">
            <ResponsiveModalClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </ResponsiveModalClose>
          </div>

          <section className="grid gap-6 p-2 sm:grid-cols-2 sm:gap-10">
            {/* Left side */}
            <div className="flex flex-col gap-y-6 sm:gap-y-10">
              <div className="space-y-4">
                <div className="page-title-font text-2xl">Story Preview</div>
                <div className="flex h-60 w-full items-center justify-center rounded-2xl border border-dashed shadow-sm dark:border-0 dark:shadow-outline sm:w-full">
                  Include a high-quality image in your story to make it more
                  inviting to readers.
                </div>
              </div>

              <div className="space-y-4">
                {/* <Input
                  placeholder="write a preview title here"
                  className={cn(inputVariants({ variant: "minimal" }))}
                />
                <Input
                  placeholder="write a preview subtitle"
                  className={cn(
                    inputVariants({
                      variant: "border-b",
                      className: "rounded-none",
                    })
                  )}
                /> */}
              </div>

              <div className="text-muted-foreground">
                Note: Changes here will affect how your story appears in public
                places like Medium’s homepage and in subscribers’ inboxes — not
                the contents of the story itself.
              </div>
            </div>
            {/* Right side */}
            <div className="flex flex-col gap-y-6 sm:gap-y-20">
              <div className="flex flex-col gap-y-4">
                <div className="page-title-font text-2xl">
                  Publishing to: Felix Lyu
                </div>
                <AutosizeTextarea
                  maxHeight={200}
                  className="border-0 ring-0 ring-transparent"
                  placeholder="write a story subtitle"
                />
                <div>
                  <div className="flex flex-col gap-y-2">
                    <span>
                      Add or change topics (up to 5) so readers know what your
                      story is about
                    </span>
                    <MultipleSelector
                      commandProps={{
                        className: "h-fit",
                      }}
                      // inputProps={{ autoFocus: isEditing }}
                      // hidePlaceholderWhenSelected
                      // onSearch={async (value) => {
                      //   const res = await searchAllCategories(value)
                      //   return res
                      // }}
                      // value={field.value}
                      badgeClassName="font-medium"
                      // onChange={field.onChange}
                      // defaultOptions={allCategoriesOptions}
                      maxSelected={5}
                      onMaxSelected={(maxLimit) => {
                        toast(
                          `You have reached max selected ${maxLimit} categories limit. Please remove some categories to add more.`,
                          {
                            position: "top-center",
                            closeButton: false,
                            className: "!font-normal",
                          }
                        )
                      }}
                      placeholder="Select or Create categories..."
                      emptyIndicator={
                        <p className="text-center text-xs text-muted-foreground">
                          Try to search for some categories
                        </p>
                      }
                      creatable
                      preventDuplicateCreation
                      loadingIndicator={
                        <span className="flex w-full items-center justify-center space-x-2 py-5 text-muted-foreground">
                          <p className="text-center text-xs ">searching</p>
                          <Loader2 className="h-2 w-2 animate-spin" />
                        </span>
                      }
                    />
                  </div>
                </div>
              </div>

              {/* TODO: CONSIDER ADD LEARN MORE ABOUT THE STORY USER IS PUBLISHING OR SOME LEGAL STATEMENTS HERE */}
              {/* <div>
                Learn more about what happens to your post when you publish.
              </div> */}
              <div className="flex items-center gap-x-4">
                <SpinnerButton
                  size={"label"}
                  variant={"success"}
                  isLoading={isPublishing}
                  className="w-28 rounded-full active:scale-[.98]"
                  onClick={() => setIsPublishing(true)}
                >
                  Publish now
                </SpinnerButton>
                <Button
                  size={"label"}
                  variant={"ghost"}
                  className="rounded-full active:scale-[.98]"
                >
                  Save for later
                </Button>
              </div>
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
