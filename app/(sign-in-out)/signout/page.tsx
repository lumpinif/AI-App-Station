import { Metadata } from "next"
import { redirect } from "next/navigation"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { siteConfig } from "@/config/site"
import SignOutButton from "@/components/auth/signout/sign-out-button"
import BackButton from "@/components/shared/back-button"

export const metadata: Metadata = {
  title: `Sign out to ${siteConfig.name}`,
  description: "Sign out page of the app ${siteConfig.name}",
}

const SignOutPage = async () => {
  const supabase = await createSupabaseServerClient()
  const { data, error: getUserError } = await supabase.auth.getUser()

  if (getUserError) {
    console.error(getUserError)
  }

  if (!data?.user) {
    return redirect("/signin")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center px-4 sm:max-w-xl">
      <BackButton className="absolute left-4 top-4 dark:shadow-outline md:left-8 md:top-8" />
      <SignOutButton variant={"destructive"} />
    </div>
  )
}

export default SignOutPage
