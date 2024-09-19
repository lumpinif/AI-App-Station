import { Metadata } from "next"
import { redirect } from "next/navigation"
import createSupabaseServerClient from "@/utils/supabase/server-client"

import { SearchParams } from "@/types/data-table"
import { siteConfig } from "@/config/site"
import { PROTECTED_PATHS } from "@/lib/constants/site-constants"
import LoginCard from "@/components/auth/signin/login-card"
import BackButton from "@/components/shared/back-button"

export const metadata: Metadata = {
  title: `Sign in to ${siteConfig.name}`,
  description: "Sign in page of the app ${siteConfig.name}",
}

// Check if the URL includes any of the protected paths
const isProtectedPath = (searchParams: SearchParams) => {
  let nextPath = searchParams.next || ""

  if (Array.isArray(nextPath)) {
    nextPath = nextPath[0]
  }

  return PROTECTED_PATHS.some((path) => nextPath.startsWith(path))
}

const SignInPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    return redirect("/")
  }

  const backUrl = isProtectedPath(searchParams) ? "/" : undefined

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center px-4 sm:max-w-xl">
      <BackButton
        back_url={backUrl}
        className="absolute left-4 top-4 dark:shadow-outline md:left-8 md:top-8"
      />
      <LoginCard className="w-full rounded-2xl dark:shadow-outline" />
    </div>
  )
}

export default SignInPage
