"use client"

import { User } from "@supabase/supabase-js"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"
import useNewStory from "@/hooks/use-new-story"
import { ButtonProps } from "@/components/ui/button"
import { SpinnerButton } from "@/components/shared/spinner-button"

type WriteNewStoryButtonProps = ButtonProps & {
  children?: React.ReactNode
  spinnerButtonCN?: string
  motionClassName?: string
  onSuccess?: () => void
}

export const WriteNewStoryButton: React.FC<WriteNewStoryButtonProps> = ({
  children,
  spinnerButtonCN,
  motionClassName,
  variant = "default",
  size = "sm",
  onSuccess,
}) => {
  const openAccountModal = useAccountModal((state) => state.openModal)
  const { isLoading, handleCreateNewStory, isUserLogged } =
    useNewStory(onSuccess)

  return (
    <SpinnerButton
      size={size}
      variant={variant}
      isLoading={isLoading}
      className={cn("w-28 text-sm", spinnerButtonCN)}
      motionClassName={motionClassName}
      onClick={isUserLogged ? handleCreateNewStory : openAccountModal}
    >
      {children ? (
        children
      ) : (
        <>
          <span>New Story</span>
          <Plus className="size-4 shrink-0" />
        </>
      )}
    </SpinnerButton>
  )
}
