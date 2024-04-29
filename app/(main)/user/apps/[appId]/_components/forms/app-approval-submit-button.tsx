"use client"

import { useState } from "react"
import { toast } from "sonner"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import { SpinnerButton } from "@/components/shared/spinner-button"

type AppApprovalSubmitProps = ButtonProps & {
  className?: string
  app_id: App["app_id"]
}

export const AppApprovalSubmitButton: React.FC<AppApprovalSubmitProps> = ({
  app_id,
  className,
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmitForApproval = async () => {
    setIsSubmitting(true)
    console.log("Submitting for approval" + app_id)
    toast.success(
      "Thank you for sharing your knowledge with the world. Your contribution is currently under review. Please stay tuned for the approval decision."
    )
  }

  return (
    <SpinnerButton
      isLoading={isSubmitting}
      onClick={handleSubmitForApproval}
      buttonClassName={cn("rounded-md", className)}
      {...props}
    >
      Publish
    </SpinnerButton>
  )
}
