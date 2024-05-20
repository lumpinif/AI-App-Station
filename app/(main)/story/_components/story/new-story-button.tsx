"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createNewStory } from "@/server/data/stories"
import { User } from "@supabase/supabase-js"
import { Rocket, SquarePen } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { useUserData } from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import useNewStoryToastStore from "@/hooks/use-story-toast-store"
import { Button, ButtonProps } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { SpinnerButton } from "@/components/shared/spinner-button"

type StoryNewFormProps = ButtonProps & {
  children?: React.ReactNode
  user?: User | null | undefined
  spinnerButtonCN?: string
}

export const NewStoryButton: React.FC<StoryNewFormProps> = ({
  user: propUser,
  children,
  spinnerButtonCN,
  variant = "default",
  size = "sm",
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const setToastId = useNewStoryToastStore((state) => state.setToastId)
  const OpenModal = useAccountModal((state) => state.OpenModal)
  const { data: hookUser } = useUserData()
  const user = propUser || hookUser
  const isUserLogged = !!user && user.id
  const router = useRouter()

  function handleCreateNewStory() {
    setIsLoading(true)
    const createNewStoryPromise = async () => {
      const { newStory, error: createNewStoryError } = await createNewStory()

      if (createNewStoryError) {
        throw new Error(createNewStoryError.message)
      }

      if (!newStory) {
        throw new Error("Failed to create new story")
      }

      // TODO: CHECK IF THIS IS NEEDED BEFORE PRODUCTION, IF IT IS, THEN ADD IT TO OTHER PLACES THAT PASSES THE JSON CONTENT

      return JSON.parse(JSON.stringify(newStory))
    }

    const newStoryLaunchingToast = toast.promise(createNewStoryPromise(), {
      dismissible: false,
      duration: 100000,
      loading: "creating the new story...",
      success: (newStory) => {
        router.push(`/user/stories/${newStory.post_id}`)
        setToastId(newStoryLaunchingToast)
        setIsLoading(false)
        return (
          <div className="flex w-full items-center justify-between gap-x-2">
            <span className="flex items-center gap-x-2">
              <LoadingSpinner size={16} /> Launching the editor...Please wait
            </span>
            <Button
              variant={"outline"}
              size={"sm"}
              className="shadow-outline text-primary dark:text-background flex h-8 items-center gap-x-2 bg-white hover:bg-white/80 active:scale-[0.98] dark:border-0"
              onClick={() => router.push(`/user/stories/${newStory.post_id}`)}
            >
              <Rocket className="size-4 stroke-1" />
              Launch
            </Button>
          </div>
        )
      },
      error: (error) => {
        setIsLoading(false)
        return error.message || "Error creating new story"
      },
    })
  }

  return (
    <SpinnerButton
      onClick={isUserLogged ? handleCreateNewStory : OpenModal}
      isLoading={isLoading}
      variant={variant}
      size={size}
      className={cn("w-28 text-sm", spinnerButtonCN)}
    >
      {children ? (
        children
      ) : (
        <>
          <span>New Post</span>
          <SquarePen className="size-4" />
        </>
      )}
    </SpinnerButton>
  )
}
