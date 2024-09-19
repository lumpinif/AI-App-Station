import { User } from "@supabase/supabase-js"

import { cn } from "@/lib/utils"

import { SignInTrigger } from "../auth/signin/sign-in-trigger"
import SignOutButton from "../auth/signout/sign-out-button"

type FooterCommandDialogProps = {
  className?: string
  user?: User | null
}

export const FooterCommandDialog: React.FC<FooterCommandDialogProps> = ({
  className,
  user,
}) => {
  return (
    <footer
      className={cn(
        "border-t px-2 py-1.5 text-sm text-muted-foreground md:px-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="relative">
          All systems normal
          <span className="absolute -right-1.5 top-0 size-1 rounded-full bg-green-600 dark:bg-green-700" />
        </span>
        {user?.id ? (
          <SignOutButton variant={"ghost"} size={"label"} />
        ) : (
          <SignInTrigger variant={"ghost"} size={"label"} />
        )}
      </div>
    </footer>
  )
}
