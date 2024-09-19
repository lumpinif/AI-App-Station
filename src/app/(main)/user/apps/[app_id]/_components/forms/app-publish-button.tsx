"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { publishApp } from "@/server/queries/supabase/table/apps-table-services"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks"
import { toast } from "sonner"

import { Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { ButtonProps } from "@/components/ui/button"
import { SpinnerButton } from "@/components/shared/spinner-button"

type TRunAnimationParams = {
  speed: number
  duration?: number
  delay?: number
}

type TConductorInstance = {
  run: (params: TRunAnimationParams) => void
  shoot: () => void
  pause: () => void
  stop: () => void
}

type AppApprovalSubmitProps = ButtonProps & {
  isAllFieldsComplete: boolean
  app_publish_status: Apps["app_publish_status"]
  children?: React.ReactNode
  className?: string
  app_id: Apps["app_id"]
  app_slug: Apps["app_slug"]
}

export const AppPublishButton: React.FC<AppApprovalSubmitProps> = ({
  isAllFieldsComplete = false,
  app_publish_status,
  children,
  app_id,
  app_slug,
  className,
  ...props
}) => {
  const router = useRouter()
  const controller = useRef<TConductorInstance | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePublishApp = async () => {
    if (app_publish_status === "published") {
      return toast.info("You have already published this app.")
    }

    setIsSubmitting(true)
    try {
      const res = await publishApp(app_id, app_slug)
      if (res?.error) {
        toast.error("An error occurred during submission.")
        setIsSubmitting(false)
      } else {
        toast.success("Thank you for sharing your knowledge with the world.")
        if (controller.current) {
          controller.current.run({ speed: 3, duration: 1500, delay: 0 })
          await new Promise((resolve) => setTimeout(resolve, 1500))
          setIsSubmitting(false)
          router.push(`/user/apps`)
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
      console.error(error)
    }
  }

  const onInitHandler = ({ conductor }: { conductor: TConductorInstance }) => {
    controller.current = conductor
  }

  return (
    <>
      <SpinnerButton
        isLoading={isSubmitting}
        onClick={handlePublishApp}
        className={cn("rounded-md", className)}
        {...props}
      >
        {children || "Submit"}
      </SpinnerButton>
      <Fireworks onInit={onInitHandler} />
      {/* <Dialog open={isSubmitting} onOpenChange={setIsSubmitting}>
        <DialogContent className="max-w-sm p-6">
          <div className="max-w-sm">
            Thank you for sharing your knowledge with the world. Your
            contribution is currently under review. Please stay tuned for the
            approval decision.
          </div>
        </DialogContent>
      </Dialog> */}
    </>
  )
}
