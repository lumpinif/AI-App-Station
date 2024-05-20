"use client"

import React from "react"
import { User } from "@supabase/supabase-js"
import { Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { useUserData } from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import { useAppSubmitModalStore } from "@/hooks/use-app-submit-modal-store"
import { Button, ButtonProps } from "@/components/ui/button"
import { AppSubmitModal } from "@/components/submit/app-submit-modal"

type AppSubmitButtonProps = ButtonProps & {
  children?: React.ReactNode
  user?: User | null | undefined
  className?: string
}

export const AppSubmitButton: React.FC<AppSubmitButtonProps> = ({
  user: propUser,
  children,
  className,
  variant = "default",
  size = "sm",
}) => {
  const openAccountModal = useAccountModal((state) => state.openModal)
  const openAppSubmitModal = useAppSubmitModalStore(
    (state) => state.openAppSubmitModal
  )
  const isSubmitModalOpen = useAppSubmitModalStore(
    (state) => state.isAppSubmitModalOpen
  )
  const { data: hookUser } = useUserData()
  const user = propUser || hookUser
  const isUserLogged = !!user && user.id

  const handleAppSubmitButtonClick = (e: React.MouseEvent) => {
    if (isUserLogged) {
      e.preventDefault()
      openAppSubmitModal()
    } else {
      openAccountModal()
    }
  }

  return (
    <>
      <AppSubmitModal isOpen={isSubmitModalOpen} user={user} />
      <Button
        variant={variant}
        size={size}
        onClick={handleAppSubmitButtonClick}
        className={cn("w-28 text-sm", className)}
      >
        {children ? (
          children
        ) : (
          <div className="flex items-center gap-x-2">
            <span className="hidden sm:flex">New App</span>
            <Upload className="size-4" />
          </div>
        )}
      </Button>
    </>
  )
}
