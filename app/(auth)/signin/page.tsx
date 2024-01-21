import { redirect } from "next/navigation"

import LoginCard from "@/components/auth/signin/login-card"
import BackButton from "@/components/shared/back-button"

import { getUserSession } from "../auth-actions"

const SignInPage = async () => {
  const { data } = await getUserSession()

  if (data.session) {
    return redirect("/")
  }

  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center px-4 sm:max-w-xl">
        <BackButton
          href="/"
          className="absolute left-4 top-4 dark:shadow-outline md:left-8 md:top-8"
        />
        <LoginCard className=" dark:shadow-outline" />
      </div>
    </>
  )
}

export default SignInPage
