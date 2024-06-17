"use client"

import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { UserCard } from "@/components/auth/profile/user-card"

type UserCardProps = {}

export const TodayUserCard: React.FC<UserCardProps> = ({}) => {
  return (
    <>
      <div
        style={{
          borderRadius: 20,
        }}
        className="relative hidden flex-col gap-y-1 overflow-hidden border bg-card/50 transition-all duration-200 ease-out hover:bg-card active:scale-[.98] dark:border-none dark:shadow-outline sm:flex"
      >
        <UserCard
          accountModalTriggerCN="size-28"
          profileContainerCN="h-fit flex-none py-10"
          profileNameCN="text-5xl page-title-font"
          profileEmailCN="text-muted-foreground font-light tracking-wide"
          className="flex h-full flex-col items-start justify-between p-10"
        />
      </div>
    </>
  )
}
