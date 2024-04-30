import { redirect } from "next/navigation"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import LoginCard from "@/components/auth/signin/login-card"
import BackButton from "@/components/shared/back-button"

const SignInPage = async () => {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getUser()

  if (data?.user) {
    return redirect("/")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center px-4 sm:max-w-xl">
      <BackButton className="dark:shadow-outline absolute left-4 top-4 md:left-8 md:top-8" />
      <LoginCard className="dark:shadow-outline w-full rounded-2xl" />
    </div>
  )
}

export default SignInPage
