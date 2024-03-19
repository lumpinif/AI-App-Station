"use client"

import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/skeleton"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"

const UserCard = ({ className }: { className?: string }) => {
  const { isFetching, data: profile } = useUser()

  if (isFetching) {
    return (
      <div>
        <AccountModalTrigger
          className="h-14 w-14 sm:flex md:h-28 md:w-28"
          isFetching={isFetching}
          profile={profile}
        />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-5 w-[150px] sm:h-8 md:h-9" />
          <Skeleton className="h-5 w-[220px]" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={cn(cardVariants({ variant: "userCard", className }))}>
        {/* <Link href="/"> */}
        {/* Avatar */}
        <div className="w-fit lg:mb-2">
          <AccountModalTrigger
            className="h-14 w-14 sm:flex md:h-28 md:w-28"
            isFetching={isFetching}
            profile={profile}
          />
        </div>
        {/* Text Container */}
        <div className="flex flex-col">
          <h1 className="text-xl font-medium sm:text-xl md:text-3xl">
            {profile?.full_name}
          </h1>
          <div className="tracking-wide text-muted-foreground">
            {profile?.email}
          </div>
        </div>
        {/* </Link> */}
      </div>
    </>
  )
}

export default UserCard
