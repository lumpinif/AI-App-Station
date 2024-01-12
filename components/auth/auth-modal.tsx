"use client"

import { Session } from "@supabase/auth-helpers-nextjs"

import useAuthModal from "@/hooks/use-auth-modal-store"
import Modal from "@/components/shared/Modal"

import LoginCard from "./login-card"
import SignOutButton from "./sign-out-button"

const AuthModal = ({ session }: { session: Session | null }) => {
  const isOpen = useAuthModal((state) => state.isOpen)
  const CloseModal = useAuthModal((state) => state.CloseModal)

  const onChange = (open: boolean) => {
    if (!open) CloseModal()
  }

  return (
    <>
      <Modal isOpen={isOpen} onChange={onChange}>
        {session ? <SignOutButton /> : <LoginCard />}
      </Modal>
    </>
  )
}

export default AuthModal
