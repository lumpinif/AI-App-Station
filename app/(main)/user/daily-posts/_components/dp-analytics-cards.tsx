import { BadgeCheck } from "lucide-react"
import numeral from "numeral"

import { Profile_role } from "@/types/db_tables"
import { cn, getProfileRoleName } from "@/lib/utils"

type DPAnalyticsCardsProps = {
  total?: number
  className?: string
  profile_role?: Profile_role["role"]
}

export default function DPAnalyticsCards({
  total,
  className,
  profile_role,
}: DPAnalyticsCardsProps) {
  return (
    <div className={cn(className)}>
      <ProfileRole profile_role={profile_role} />
      <TotalCountCard total={total} />
    </div>
  )
}

function TotalCountCard({ total, className }: DPAnalyticsCardsProps) {
  return (
    <div
      className={cn(
        "col-span-1 flex w-full cursor-pointer flex-col justify-between gap-y-4 rounded-xl border border-border/50 p-2 py-4 text-center shadow-sm transition-all duration-150 ease-out hover:shadow-md dark:shadow-none hover:dark:shadow-none md:p-4",
        className
      )}
    >
      <p className="text-center text-xs text-muted-foreground">
        You have submitted
      </p>
      <div className="page-title-font w-full select-none text-nowrap text-center text-4xl sm:text-5xl">
        {numeral(total).format("0.[0]a")}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Daily AI Posts
      </p>
    </div>
  )
}

function ProfileRole({ profile_role }: DPAnalyticsCardsProps) {
  const profileRoleName = getProfileRoleName(profile_role)

  return (
    <div className="col-span-1 flex w-full cursor-pointer flex-col justify-between gap-y-4 rounded-xl border border-border/50 p-2 py-4 text-center shadow-sm transition-all duration-150 ease-out hover:shadow-md dark:shadow-none hover:dark:shadow-none md:p-4">
      <p className="text-center text-xs text-muted-foreground">
        Your Account Role
      </p>
      <div className="page-title-font w-full truncate text-nowrap text-center text-lg">
        {profileRoleName}
      </div>
      <p className="relative text-center text-sm text-muted-foreground">
        Verified Creator
        <BadgeCheck className="absolute -top-1 right-0 size-4 fill-blue-600 stroke-background" />
      </p>
    </div>
  )
}
