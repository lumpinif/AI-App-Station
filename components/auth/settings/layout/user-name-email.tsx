"use client"

import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"

function UserNameEmail({ className }: { className?: string }) {
  const { data: profile } = useUser()
  return (
    <div>
      <h2
        className={cn(
          "text-xl font-bold tracking-tight sm:text-2xl",
          className
        )}
      >
        {profile?.full_name || profile?.email}
      </h2>
      <p className="text-muted-foreground">{profile?.email}</p>
    </div>
  )
}

export default UserNameEmail
