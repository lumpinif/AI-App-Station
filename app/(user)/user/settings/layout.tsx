import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import UserAvatar from "@/components/auth/avatar/user-avatar"
import { SidebarNav } from "@/components/auth/settings/layout/sidebar-nav"
import UserNameEmail from "@/components/auth/settings/layout/user-name-email"
import BackButton from "@/components/shared/back-button"

import {
  getUserData,
  getUserProfile,
  getUserSession,
} from "../../../../server/auth"
import Loading from "./loading"

export const metadata: Metadata = {
  title: "Settings",
  description: "Profile and Account Settings",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const {
    data: { user },
  } = await getUserData()

  const { data: profileData } = await getUserProfile(user)

  const {
    data: { session },
  } = await getUserSession()

  if (!session && !user) {
    return redirect("/signin")
  }

  return (
    <>
      <header className="flex w-full items-center p-4 sm:px-8">
        <BackButton href="/" className=" dark:shadow-outline" />
      </header>
      <div className="flex flex-col items-center justify-center px-4 sm:container">
        <div className="w-full rounded-3xl p-10 pb-16 dark:shadow-outline">
          <div className="flex flex-col justify-start space-y-6 md:space-y-8 xl:space-y-10">
            <UserAvatar
              session={session}
              className="h-20 w-20 sm:h-32 sm:w-32"
            />
            <div>
              <h2 className="text-3xl font-bold  tracking-tight sm:text-4xl">
                Settings
              </h2>
              <p className="text-muted-foreground">
                Manage your profile and account preferences.
              </p>
            </div>
          </div>
          <Separator className="my-6" />
          <UserNameEmail session={session} userData={profileData} />
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/6">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
