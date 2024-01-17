import { Metadata } from "next"
import { redirect } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import AuthPageHeader from "@/components/auth/auth-page-header"
import UserAvatar from "@/components/auth/avatar/auth-avatar"
import { SidebarNav } from "@/components/auth/settings/sidebar-nav"

import { getUserData, getUserSession } from "../auth-actions"

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

  const {
    data: { session },
  } = await getUserSession()

  if (!session && !user) {
    return redirect("/signin")
  }

  return (
    <>
      <div className="mb-10 sm:container">
        <div className="w-full space-y-6 rounded-3xl p-10 pb-16 dark:shadow-outline sm:mx-4">
          <div className="space-y-0.5">
            {user && (
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
            )}
          </div>
          <Separator className="my-6" />
          {user && (
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                {user?.user_metadata?.full_name || user?.email}
              </h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          )}
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/6">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
