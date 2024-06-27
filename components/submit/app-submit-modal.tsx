"use client"

import React from "react"
import { User } from "@supabase/supabase-js"

import { useAppSubmitModalStore } from "@/hooks/use-app-submit-modal-store"
import AppSubmitPage from "@/app/(main)/submit/page"

import LoginCard from "../auth/signin/login-card"
import ResponsiveContentModal from "../shared/responsive-content-modal"
import { ThemeToggle } from "../theme/theme-toggle"

type AppSubmitModalProps = {
  user: User | null | undefined
}

export const AppSubmitModal: React.FC<AppSubmitModalProps> = ({ user }) => {
  const isSubmitModalOpen = useAppSubmitModalStore(
    (state) => state.isAppSubmitModalOpen
  )
  const closeAppSubmitModal = useAppSubmitModalStore(
    (state) => state.closeAppSubmitModal
  )

  const onChange = (open: boolean) => {
    if (!open) closeAppSubmitModal()
  }

  return (
    <ResponsiveContentModal
      isOpen={isSubmitModalOpen}
      onChange={onChange}
      title="Submit an app"
      drawerHeight="h-[60%]"
      drawerContentClassName="outline-none rounded-t-3xl"
      dialogContentClassName="max-w-2xl rounded-2xl border border-border dark:border-0 outline-none dark:shadow-top"
    >
      {user?.id ? (
        <AppSubmitPage />
      ) : (
        <LoginCard className="flex flex-col gap-10">
          <div className="mt-2 flex justify-end border-t sm:hidden">
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </div>
        </LoginCard>
      )}
    </ResponsiveContentModal>
  )
}
