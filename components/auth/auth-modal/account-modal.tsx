"use client"

import { Session } from "@supabase/auth-helpers-nextjs"

import useAccountModal from "@/hooks/use-account-modal-store"
import Modal from "@/components/shared/modal"

import UserAccount from "../avatar/user-account"
import LoginCard from "../signin/login-card"

const AccountModal = ({ session }: { session: Session | null }) => {
  const isOpen = useAccountModal((state) => state.isOpen)
  const CloseModal = useAccountModal((state) => state.CloseModal)

  const onChange = (open: boolean) => {
    if (!open) CloseModal()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onChange={onChange}
        className="h-[95%]"
        title="Account"
      >
        {session ? <UserAccount /> : <LoginCard />}
      </Modal>
    </>
  )
}

export default AccountModal
