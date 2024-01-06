"use client"

import { Avatar } from "@radix-ui/react-avatar"

import useAuthModal from "@/hooks/use-auth-modal-store"

import { Icons } from "../icons/icons"

const AuthTrigger = () => {
  const OpenModal = useAuthModal((state) => state.OpenModal)

  return (
    <>
      <UserAvatarTrigger size={40} onClick={OpenModal} />
    </>
  )
}

export default AuthTrigger

type UserAvatarTriggerProps = {
  size?: number
  onClick: () => void
}

const UserAvatarTrigger = ({ size, onClick }: UserAvatarTriggerProps) => {
  return (
    <button onClick={onClick}>
      <Avatar className="cursor-pointer">
        {/* <Skeleton className={`h-10 w-10 rounded-full`} /> */}
        <Icons.user size={size} />
      </Avatar>
    </button>
  )
}
