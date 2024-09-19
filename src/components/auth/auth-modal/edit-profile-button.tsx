import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

type EditProfileButtonProps = ButtonProps & {
  children?: React.ReactNode
  className?: string
}

export const EditProfileButton: React.FC<EditProfileButtonProps> = ({
  children,
  className,
  size = "sm",
  variant = "outline",
  ...props
}) => {
  return (
    <Button
      className={cn("active:scale-[.98]", className)}
      size={size}
      variant={variant}
      {...props}
    >
      {children ? children : <span>Edit profile</span>}
    </Button>
  )
}
