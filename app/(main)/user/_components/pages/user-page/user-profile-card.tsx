import { useState } from "react"
import { useRouter } from "next/navigation"

import { Profile } from "@/types/db_tables"
import useUserProfile from "@/hooks/react-hooks/use-user"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"
import { UserCard } from "@/components/auth/auth-modal/user-card"
import { UserAvatar } from "@/components/auth/avatar/user-avatar"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

import { UserBio } from "./user-bio"
import { UserJoinTime } from "./user-join-time"
import { UserLocation } from "./user-location"
import { UserProfileEditForm } from "./user-profile-edit/user-profile-edit-form"
import { UserWebsite } from "./user-website"

export const UserProfileCard = () => {
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false)

  const { data: profile } = useUserProfile()

  if (!profile) return null

  const onChange = (open: boolean) => {
    if (!open) setIsProfileEditModalOpen(false)
  }
  return (
    <>
      <ResponsiveContentModal
        isOpen={isProfileEditModalOpen}
        onChange={onChange}
        drawerContentClassName="outline-none rounded-t-3xl"
        drawerHeight="h-[90%]"
        dialogContentClassName="max-w-xl rounded-2xl overflow-hidden"
        title="Update Profile"
      >
        <UserProfileEditForm
          profile={profile}
          onFormSubmitted={() => setIsProfileEditModalOpen(false)}
        />
      </ResponsiveContentModal>
      <div
        className={
          "bg-background relative mx-auto w-full md:max-w-xl lg:max-w-2xl"
        }
      >
        <div className="flex flex-col space-y-4 sm:space-y-6">
          {/* User card and edit button */}
          <div className="flex items-center gap-x-4 md:flex-col">
            <div className="flex w-full items-start justify-between gap-x-2">
              <UserCard
                isWithLink={false}
                isTriggerModal={false}
                className="flex-1 space-x-2 sm:space-x-4"
                profileNameCN="text-lg font-medium sm:text-2xl"
                profileEmailCN="text-sm font-normal text-muted-foreground tracking-normal"
                accountModalTriggerCN="size-16 md:size-20 lg:size-24"
                display="user_name"
              />
              <Button
                className="rounded-full max-sm:h-7 max-sm:px-2"
                size={"sm"}
                variant={"outline"}
                onClick={() => setIsProfileEditModalOpen(true)}
              >
                Edit profile
              </Button>
            </div>
          </div>

          {/* User bio */}
          <UserBio user_bio={profile?.user_bio} />

          {/* User location, website, join time */}
          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-4">
            <UserLocation user_location={profile?.user_location} />
            <UserWebsite user_website={profile?.user_website} />
            <UserJoinTime created_at={profile?.created_at} />
          </div>
        </div>
      </div>
    </>
  )
}
