"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { handleAppReviewSubmission } from "@/server/data/supabase-actions"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks"
import { toast } from "sonner"

import { App } from "@/types/db_tables"
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
  ready_to_submit?: boolean
  children?: React.ReactNode
  className?: string
  app_id: App["app_id"]
}

export const AppApprovalSubmitButton: React.FC<AppApprovalSubmitProps> = ({
  ready_to_submit,
  children,
  app_id,
  className,
  ...props
}) => {
  const router = useRouter()
  const controller = useRef<TConductorInstance | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitForApproval = async () => {
    if (ready_to_submit === true) {
      return toast.info("You have already submitted this app for approval.")
    }

    setIsSubmitting(true)
    try {
      const res = await handleAppReviewSubmission(app_id)
      if (res?.error) {
        toast.error("An error occurred during submission.")
        setIsSubmitting(false)
      } else {
        toast.success(
          "Thank you for sharing your knowledge with the world. Your contribution is currently under review. Please stay tuned for the approval decision."
        )
        if (controller.current) {
          controller.current.run({ speed: 3, duration: 1000, delay: 0 })
          await new Promise((resolve) => setTimeout(resolve, 1000))
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
        onClick={handleSubmitForApproval}
        buttonClassName={cn("rounded-md", className)}
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
