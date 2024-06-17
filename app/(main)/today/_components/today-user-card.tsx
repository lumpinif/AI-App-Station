"use client"

import { useRouter } from "next/navigation"

import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { UserCard } from "@/components/auth/profile/user-card"

type UserCardProps = {}

export const TodayUserCard: React.FC<UserCardProps> = ({}) => {
  const { data: profile, isFetching } = useUserProfile()
  const openAccountModal = useAccountModal((state) => state.openModal)
  const isModalOpen = useAccountModal((state) => state.isOpen)
  const router = useRouter()

  const handleAvartarModalTriggerClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!isModalOpen) {
      e.preventDefault()
      openAccountModal()
      e.stopPropagation()
    } else {
      router.push("/user")
    }
  }

  if (!profile?.user_id) {
    return (
      <div
        style={{
          borderRadius: 20,
        }}
        onClick={handleAvartarModalTriggerClick}
        className="relative hidden cursor-pointer flex-col items-center justify-center gap-y-1 overflow-hidden border bg-card/50 transition-all duration-200 ease-out hover:bg-card active:scale-[.98] dark:border-none dark:shadow-outline sm:flex"
      >
        <AccountModalTrigger
          profile={profile}
          className="size-24"
          isTriggerModal={false}
          isFetching={isFetching}
        />
        <h1 className="page-title-font select-none">Please Sign In</h1>
      </div>
    )
  }

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
