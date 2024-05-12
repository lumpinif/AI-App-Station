import { redirect } from "next/navigation"
import { getUserData } from "@/server/auth"

import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"

import { UserPageLayout } from "./_components/pages/user-page/user-page-layout"

export default async function UserPage() {
  // const {
  //   data: { user },
  //   error,
  // } = await getUserData()

  // if (error) {
  //   console.error(error)
  // }

  // if (!user) {
  //   redirect("/signin")
  // }

  return (
    <div className="flex items-center space-x-2">
      {/* <AccountModalTrigger
        withAvartarUploader={true}
        isTriggerModal={false}
        className="size-16 md:size-20 lg:size-24"
      /> */}
      <UserPageLayout />
    </div>
  )
}
