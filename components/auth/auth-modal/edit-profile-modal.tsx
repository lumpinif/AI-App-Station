import { useState } from "react"

import { cardVariants } from "@/lib/constants"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"
import { UserProfileEditForm } from "@/app/(main)/user/_components/pages/user-page/user-profile-edit/user-profile-edit-form"

import { EditProfileButton } from "./edit-profile-button"

const EditProfileModal = () => {
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false)

  const { data: profile } = useUserProfile()

  if (!profile) return null

  const onChange = (open: boolean) => {
    if (!open) setIsProfileEditModalOpen(false)
  }

  return (
    <>
      <ResponsiveContentModal
        nested={true}
        onChange={onChange}
        title="Update Profile"
        drawerHeight="h-[85%]"
        isOpen={isProfileEditModalOpen}
        dialogContentClassName="max-w-xl rounded-2xl overflow-hidden"
        drawerContentClassName="outline-none rounded-t-3xl"
      >
        <UserProfileEditForm
          profile={profile}
          onFormSubmitted={() => setIsProfileEditModalOpen(false)}
        />
      </ResponsiveContentModal>

      <EditProfileButton
        onClick={() => setIsProfileEditModalOpen(true)}
        size={"default"}
        variant={"default"}
        className={cn(
          "text-primary",
          cardVariants({
            variant: "nav-links-card",
            className: "rounded-lg justify-center",
          })
        )}
      >
        <span className="font-normal">Manage Your Account</span>
      </EditProfileButton>
    </>
  )
}

export default EditProfileModal
