"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createNewStory } from "@/server/data/stories"
import { User } from "@supabase/supabase-js"
import { Rocket, SquarePen } from "lucide-react"
import { toast } from "sonner"

import useAccountModal from "@/hooks/use-account-modal-store"
import useEditorLaunchingToastStore from "@/hooks/use-toast-store"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { SpinnerButton } from "@/components/shared/spinner-button"

type StoryNewFormProps = {
  user: User | null | undefined
}

export const NewStoryButton: React.FC<StoryNewFormProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false)
  const setToastId = useEditorLaunchingToastStore((state) => state.setToastId)
  const OpenModal = useAccountModal((state) => state.OpenModal)
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

      return newStory
    }

    const newLaunchingToast = toast.promise(createNewStoryPromise(), {
      duration: 6000,
      className: "bg-black",
      loading: "creating the new story...",
      success: (newStory) => {
        router.push(`/user/stories/${newStory.post_id}`)
        setToastId(newLaunchingToast)
        setIsLoading(false)
        return (
          <div className="flex w-full items-center justify-between gap-x-2">
            <span className="flex items-center gap-x-2">
              <LoadingSpinner size={16} /> Launching the editor
            </span>
            <Button
              variant={"outline"}
              size={"sm"}
              className="shadow-outline text-primary dark:text-background hover:bg-muted flex h-8 items-center gap-x-2 bg-white active:scale-[0.98] dark:border-0"
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
      variant={"default"}
      size={"sm"}
      className="w-28 text-sm"
    >
      <span>New Post</span>
      <SquarePen className="size-4" />
    </SpinnerButton>
  )
}
