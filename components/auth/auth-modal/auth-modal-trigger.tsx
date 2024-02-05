import { cn } from "@/lib/utils"
import useAuthModal from "@/hooks/use-auth-modal-store"
import { Avatar } from "@/components/ui/avatar"
import { Icons } from "@/components/icons/icons"

const AuthModalTrigger = ({ className }: { className?: string }) => {
  const OpenModal = useAuthModal((state) => state.OpenModal)

  return (
    <Avatar className={cn(className)} onClick={OpenModal}>
      <Icons.user className="h-[22px] w-[22px] rounded-full hover:cursor-pointer" />
    </Avatar>
  )
}

export default AuthModalTrigger
