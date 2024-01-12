import { Avatar } from "@radix-ui/react-avatar"

import useAuthModal from "@/hooks/use-auth-modal-store"

import { Icons } from "../icons/icons"

const AuthAvatarTrigger = () => {
  const OpenModal = useAuthModal((state) => state.OpenModal)

  return (
    <>
      <button onClick={OpenModal}>
        <Avatar className="cursor-pointer outline-none">
          <Icons.user size={40} />
        </Avatar>
      </button>
    </>
  )
}

export default AuthAvatarTrigger
