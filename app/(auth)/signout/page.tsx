import { redirect } from "next/navigation"
import { getUserSession } from "@/server/auth"

import SignOutButton from "@/components/auth/signout/sign-out-button"
import BackButton from "@/components/shared/back-button"

const SignOutPage = async () => {
  const { data } = await getUserSession()

  if (!data.session) {
    return redirect("/signin")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center px-4 sm:max-w-xl">
      <BackButton className="absolute left-4 top-4 dark:shadow-outline md:left-8 md:top-8" />
      <SignOutButton />
    </div>
  )
}

export default SignOutPage
