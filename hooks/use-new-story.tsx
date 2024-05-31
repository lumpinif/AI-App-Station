import { useState } from "react"
import { useRouter } from "next/navigation"
import { createNewPost } from "@/server/queries/supabase/stories"
import { Rocket } from "lucide-react"
import { toast } from "sonner"

import { useUserData } from "@/hooks/react-hooks/use-user"
import useNewStoryToastStore from "@/hooks/use-story-toast-store"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

import { usePopoverStore } from "./use-popover-store"

const useNewStory = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false)
  const setToastId = useNewStoryToastStore((state) => state.setToastId)
  const closePopover = usePopoverStore((state) => state.closePopover)

  const { data: user } = useUserData()
  const router = useRouter()

  const handleCreateNewStory = async () => {
    setIsLoading(true)
    const newStoryLaunchingToast = toast.promise(
      createNewPost().then(({ newStory, error: createNewStoryError }) => {
        if (createNewStoryError) {
          throw new Error(createNewStoryError.message)
        }

        if (!newStory) {
          throw new Error("Failed to create new story")
        }

        const parsedNewStory = JSON.parse(JSON.stringify(newStory))
        // router.push(`/user/stories/${parsedNewStory.post_id}`)
        setToastId(newStoryLaunchingToast)
        return parsedNewStory
      }),
      {
        dismissible: false,
        duration: 100000,
        loading: (
          <span className="flex items-center gap-x-2">
            <LoadingSpinner size={16} /> Creating the new story... Please wait
          </span>
        ),
        success: (newStory) => {
          router.push(`/user/stories/${newStory.post_id}`)
          setIsLoading(false)
          if (onSuccess) onSuccess()
          return (
            <div className="flex w-full items-center justify-between gap-x-2">
              <span className="flex items-center gap-x-2">
                <LoadingSpinner size={16} /> Launching the editor... Please wait
              </span>
              <Button
                variant={"outline"}
                size={"sm"}
                className="flex h-8 flex-none items-center gap-x-2 text-nowrap bg-white text-primary shadow-outline hover:bg-white/80 active:scale-[0.98] dark:border-0 dark:text-background"
                onClick={() => router.push(`/user/stories/${newStory.post_id}`)}
              >
                <Rocket className="size-4 flex-none whitespace-nowrap text-nowrap stroke-1" />
                Launch
              </Button>
            </div>
          )
        },
        error: (error) => {
          setIsLoading(false)
          closePopover()
          return (
            error.message || "Error creating new story... Please try again."
          )
        },
      }
    )
  }

  const isUserLogged = !!user && user.id

  return {
    isLoading,
    handleCreateNewStory,
    isUserLogged,
  }
}

export default useNewStory
