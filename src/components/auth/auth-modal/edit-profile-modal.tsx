import { useState } from "react"

import useUserProfile from "@/hooks/react-hooks/use-user"
import { ButtonProps } from "@/components/ui/button"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"
import { UserProfileEditForm } from "@/app/(main)/user/_components/pages/user-page/user-profile-edit/user-profile-edit-form"

import { EditProfileButton } from "./edit-profile-button"

type EditProfileModalProps = ButtonProps & {}

const EditProfileModal = ({ ...props }: EditProfileModalProps) => {
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
        {...props}
      >
        <span className="font-normal">Manage Your Account</span>
      </EditProfileButton>
    </>
  )
}

export default EditProfileModal
