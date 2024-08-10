import { PropsWithChildren } from "react"

import { iosTransition } from "@/config/animations/ios-transition"
import { cn } from "@/lib/utils"
import useAccountModal from "@/hooks/use-account-modal-store"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

type SignInTriggerProps = ButtonProps &
  PropsWithChildren & { className?: string }

export const SignInTrigger: React.FC<SignInTriggerProps> = ({
  size,
  variant,
  className,
  children,
}) => {
  const openModal = useAccountModal((state) => state.openModal)

  return (
    <div
      className={cn(
        "hover:cursor-pointer active:scale-[.98]",
        iosTransition,
        buttonVariants({ className, size, variant })
      )}
      onClick={openModal}
    >
      <span className="select-none">{children ? children : "Sign In"}</span>
    </div>
  )
}
