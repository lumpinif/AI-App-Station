import { useState } from "react"

import useUserProfile from "@/hooks/react-hooks/use-user"
import { TooltipProvider } from "@/components/ui/tooltip"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"
import { UserProfileEditForm } from "@/app/(main)/user/_components/pages/user-page/user-profile-edit/user-profile-edit-form"

import { Button } from "../../ui/button"

const EditProfileButton = () => {
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
          className="p-6"
          onFormSubmitted={() => setIsProfileEditModalOpen(false)}
        />
      </ResponsiveContentModal>

      <Button
        className="rounded-full active:scale-[.98] max-sm:h-7 max-sm:px-2"
        size={"sm"}
        variant={"outline"}
        onClick={() => setIsProfileEditModalOpen(true)}
      >
        Edit profile
      </Button>
    </>
  )
}

export default EditProfileButton
