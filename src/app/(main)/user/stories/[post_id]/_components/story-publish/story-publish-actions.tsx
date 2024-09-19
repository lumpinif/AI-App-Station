import { useState } from "react"
import { useRouter } from "next/navigation"

import { Posts } from "@/types/db_tables"
import { SpinnerButtonCopyType } from "@/types/shared"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { SpinnerButton } from "@/components/shared/spinner-button"

type StoryPublishActionsProps = {
  isEdited: boolean
  handleSave: () => void
  handlePublish: () => void
  saveButtonState?: keyof SpinnerButtonCopyType
  publishButtonState?: keyof SpinnerButtonCopyType
  post_publish_status: Posts["post_publish_status"]
}

export const StoryPublishActions: React.FC<StoryPublishActionsProps> = ({
  isEdited,
  handleSave,
  handlePublish,
  saveButtonState,
  publishButtonState,
  post_publish_status,
}) => {
  const draft = post_publish_status === "draft"
  const pending = post_publish_status === "pending"
  const published = post_publish_status === "published"

  let publishButtonLabel

  if (published) {
    if (isEdited) {
      publishButtonLabel = "Update"
    } else {
      publishButtonLabel = "Go to story"
    }
  } else {
    if (pending) {
      if (isEdited) {
        publishButtonLabel = "Save for now"
      } else {
        publishButtonLabel = "Pending"
      }
    } else {
      publishButtonLabel = "Publish now"
    }
  }

  const saveButtonLabel = isEdited ? "Save for now" : "Back to stories"

  const handlePublishClick = () => {
    handlePublish()
  }

  const handleSaveClick = () => {
    handleSave()
  }

  return (
    <div className="flex items-center justify-end gap-x-4 max-sm:flex-col max-sm:gap-y-4">
      <SpinnerButton
        type="button"
        size={"label"}
        withSuccess={true}
        // variant={"default"}
        disabled={pending && !isEdited}
        id="story-publish-button"
        buttonState={publishButtonState}
        onClick={handlePublishClick}
        successElement={<span>Published</span>}
        loadingElement={
          <span className="flex items-center gap-x-4 text-xs">
            <LoadingSpinner className="size-1" />
            Publishing
          </span>
        }
        className="w-28 rounded-full border-0 active:scale-[.98] disabled:bg-transparent disabled:text-muted-foreground max-sm:w-full"
      >
        {publishButtonLabel}
      </SpinnerButton>

      {!pending ? (
        <SpinnerButton
          type="button"
          size={"label"}
          variant={"ghost"}
          withSuccess={true}
          id="story-save-button"
          onClick={handleSaveClick}
          buttonState={saveButtonState}
          successElement={<span>Saved</span>}
          loadingElement={
            <span className="flex items-center gap-x-4 text-xs">
              <LoadingSpinner className="size-1" />
              Saving
            </span>
          }
          className="w-28 rounded-full border-0 active:scale-[.98] max-sm:w-full"
        >
          {saveButtonLabel}
        </SpinnerButton>
      ) : (
        <>
          {!isEdited ? (
            <SpinnerButton
              type="button"
              size={"label"}
              variant={"ghost"}
              withSuccess={true}
              id="story-save-button"
              onClick={handleSaveClick}
              buttonState={saveButtonState}
              successElement={<span>Saved</span>}
              loadingElement={
                <span className="flex items-center gap-x-4 text-xs">
                  <LoadingSpinner className="size-1" />
                  Saving
                </span>
              }
              className="w-28 rounded-full border-0 active:scale-[.98] max-sm:w-full"
            >
              {saveButtonLabel}
            </SpinnerButton>
          ) : null}
        </>
      )}
    </div>
  )
}
