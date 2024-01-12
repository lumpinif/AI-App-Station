import { redirect } from "next/navigation"
import getUserSession from "@/utils/actions"

import LoginCard from "@/components/auth/login-card"

const SignInPage = async () => {
  const { data } = await getUserSession()

  if (data.session) {
    return redirect("/")
  }

  return (
    <>
      <div className="mx-auto flex max-w-sm items-center justify-center px-4 sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <LoginCard className=" dark:shadow-outline" />
      </div>
    </>
  )
}

export default SignInPage
