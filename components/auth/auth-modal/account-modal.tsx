"use client"

import { Session, User } from "@supabase/supabase-js"

import useAccountModal from "@/hooks/use-account-modal-store"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"
import { ThemeToggle } from "@/components/theme/theme-toggle"

import UserAccount from "../avatar/user-account"
import LoginCard from "../signin/login-card"

const AccountModal = ({ user }: { user: User | null }) => {
  const isOpen = useAccountModal((state) => state.isOpen)
  const CloseModal = useAccountModal((state) => state.CloseModal)
  const onChange = (open: boolean) => {
    if (!open) CloseModal()
  }

  return (
    <ResponsiveContentModal
      isOpen={isOpen}
      onChange={onChange}
      drawerContentClassName="outline-none rounded-t-3xl"
      drawerHeight="h-[90%]"
      dialogContentClassName="max-w-xl rounded-2xl overflow-hidden"
      title="Account"
    >
      {user?.id ? (
        <UserAccount />
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

export default AccountModal
