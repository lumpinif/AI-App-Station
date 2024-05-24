import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

type SignInTriggerProps = ButtonProps & { className?: string }

export const SignInTrigger: React.FC<SignInTriggerProps> = ({
  className,
  variant,
  size,
}) => {
  const openModal = useAccountModal((state) => state.openModal)

  return (
    <div
      className={cn(
        "hover:cursor-pointer active:scale-[.98]",
        buttonVariants({ className, size, variant })
      )}
      onClick={openModal}
    >
      <span className="select-none">Sign In</span>
    </div>
  )
}
