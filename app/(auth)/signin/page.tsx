import { redirect } from "next/navigation"
import getUserSession from "@/utils/supabase/actions"

import LoginCard from "@/components/auth/signin/login-card"

const SignInPage = async () => {
  const { data } = await getUserSession()

  if (data.session) {
    return redirect("/")
  }

  return (
    <>
      <div className="mx-auto flex w-full flex-col items-center justify-center px-4 sm:max-w-xl">
        <LoginCard className=" dark:shadow-outline" />
      </div>
    </>
  )
}

export default SignInPage
