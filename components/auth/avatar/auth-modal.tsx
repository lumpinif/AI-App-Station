"use client"

import { Session } from "@supabase/auth-helpers-nextjs"

import useAuthModal from "@/hooks/use-auth-modal-store"

import LoginCard from "../signin/login-card"
import UserCard from "./user-card"

const AuthModal = ({ session }: { session: Session | null }) => {
  const isOpen = useAuthModal((state) => state.isOpen)
  const CloseModal = useAuthModal((state) => state.CloseModal)

  const onChange = (open: boolean) => {
    if (!open) CloseModal()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onChange={onChange}
        className="h-[95%]"
        title="Profile"
      >
        {session ? <UserCard session={session} /> : <LoginCard />}
      </Modal>
    </>
  )
}

export default AuthModal
