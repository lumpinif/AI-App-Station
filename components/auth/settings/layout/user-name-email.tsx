import { Session } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"
import { cn } from "@/lib/utils"

type Profiles = Database["public"]["Tables"]["profiles"]["Row"]

interface UserNameEmail {
  session: Session | null
  userData?: Profiles | null
  className?: string
}

function UserNameEmail({ session, userData, className }: UserNameEmail) {
  return (
    <div>
      <h2
        className={cn(
          "text-xl font-bold tracking-tight sm:text-2xl",
          className
        )}
      >
        {userData?.full_name ||
          session?.user?.user_metadata?.full_name ||
          session?.user.email}
      </h2>
      <p className="text-muted-foreground">{session?.user.email}</p>
    </div>
  )
}

export default UserNameEmail
