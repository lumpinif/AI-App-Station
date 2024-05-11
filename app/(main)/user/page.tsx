import Image from "next/image"
import { redirect } from "next/navigation"
import { getUserData } from "@/server/auth"

import AccountModalTrigger from "@/components/auth/auth-modal/account-modal-trigger"

export default async function UserPage() {
  const { data, error } = await getUserData()

  if (error) {
    console.error(error)
  }

  if (!data?.user) {
    redirect("/signin")
  }

  return (
    <div className="">
      <AccountModalTrigger
        withAvartarUploader={true}
        isTriggerModal={false}
        className="size-20 md:size-32 lg:size-36"
      />
    </div>
  )
}
