import { useState } from "react"
import { useRouter } from "next/navigation"

import { SpinnerButtonCopyType } from "@/types/shared"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { SpinnerButton } from "@/components/shared/spinner-button"

type StoryPublishActionsProps = {
  handleSave: () => void
  handlePublish: () => void
  saveButtonState?: keyof SpinnerButtonCopyType
  publishButtonState?: keyof SpinnerButtonCopyType
}

export const StoryPublishActions: React.FC<StoryPublishActionsProps> = ({
  handleSave,
  handlePublish,
  saveButtonState,
  publishButtonState,
}) => {
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
        id="story-publish-button"
        size={"label"}
        withSuccess={true}
        // variant={"default"}
        buttonState={publishButtonState}
        onClick={handlePublishClick}
        successElement={<span>Published</span>}
        loadingElement={
          <span className="flex items-center gap-x-4 text-xs">
            <LoadingSpinner className="size-1" />
            Publishing
          </span>
        }
        className="w-28 rounded-full border-0 active:scale-[.98] max-sm:w-full"
      >
        Publish now
      </SpinnerButton>

      <SpinnerButton
        type="button"
        id="story-save-button"
        size={"label"}
        variant={"ghost"}
        withSuccess={true}
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
        Save for later
      </SpinnerButton>
    </div>
  )
}
