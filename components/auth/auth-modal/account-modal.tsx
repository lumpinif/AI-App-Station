"use client"

import { User } from "@supabase/supabase-js"

import useAccountModal from "@/hooks/use-account-modal-store"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"
import { ThemeToggle } from "@/components/theme/theme-toggle"

import LoginCard from "../signin/login-card"
import AccountModalContent from "./account-modal-content"

const AccountModal = ({ user }: { user: User | null }) => {
  const isOpen = useAccountModal((state) => state.isOpen)
  const closeAccountModal = useAccountModal((state) => state.closeModal)

  const onChange = (open: boolean) => {
    if (!open) closeAccountModal()
  }

  return (
    <ResponsiveContentModal
      title="Account"
      isOpen={isOpen}
      onChange={onChange}
      drawerHeight="h-[90%]"
      shouldScaleBackground={true}
      drawerContentClassName="outline-none rounded-t-3xl"
      dialogContentClassName="max-w-xl rounded-2xl border-0 outline-none"
    >
      {user?.id ? (
        <AccountModalContent />
      ) : (
        <LoginCard className="flex flex-col gap-10">
          <ThemeToggle className="ml-auto" />
        </LoginCard>
      )}
    </ResponsiveContentModal>
  )
}

export default AccountModal
